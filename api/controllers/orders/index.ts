// Global models
import { Order, User } from "api/models";
import { sendEmail } from "@utils/server";

// Global types
import { IOrder, IQuery, IWebsiteSettings, User as IUser } from "@types";

// Vendors
import { DateTime } from "luxon";

// Global utils
import { getQuery, getResponse, getPeriod } from "@utils/server";

// Vendors
import mongoose from "mongoose";

// Global utilities @shared
import { isObjectEmpty } from "@utils/shared";

// Fetch orders
const fetchOrdersWithAuth = async ({
  user,
  query,
}: {
  user: IUser;
  query: IQuery;
}) => {
  try {
    // Extracting limit and skip
    const { limit = 6, skip = 0, sellers, oid, ...rest } = query;

    let owner: Object;

    // Check if owner exists by id or store
    if (oid || sellers) {
      // Find user based on the OID
      const users = await User.find(
        oid
          ? { _id: oid }
          : sellers
          ? { slug: { $in: (sellers as string)?.split(",") } }
          : {}
      ).lean();

      // Throw an error if user is not found
      if (!users)
        throw new Error("Something wen't wrong, please try again later");

      // Return owner id
      owner = { $in: users.map((el) => el._id) };
    } else {
      owner = {}; // Return an empty search
    }

    // Check if it's a parse
    const hex = /[0-9A-Fa-f]{6}/g;

    // Restructure query based on order schema
    const $match = getQuery({
      query: rest,
      initial: !isObjectEmpty(owner)
        ? {
            $and: [
              {
                "products.owner": owner,
              },
            ],
          }
        : {},
      map: {
        period: (val) => {
          switch (val) {
            case "last-week":
            case "last-month":
            case "last-year":
            case "today":
              return {
                ...getPeriod(val),
              };
            default:
              return {};
          }
        },
        status: (val) => ({
          status: {
            $in: val.split(","),
          },
        }),
        search: (val) =>
          hex.test(val)
            ? { _id: new mongoose.Types.ObjectId(val.toString()) }
            : {
                $or: [
                  {
                    email: { $regex: new RegExp(val.toString(), "i") },
                  },
                  {
                    path: { $regex: new RegExp(val.toString(), "i") },
                  },
                ],
              },
        _id: (val) => ({
          _id: new mongoose.Types.ObjectId(val.toString()),
        }),
      },
    });

    const $unset = ["path", "cc"];

    const $addFields =
      user["role"] == "reseller"
        ? {
            products: {
              $filter: {
                input: "$products",
                as: "item",
                cond: {
                  $eq: [
                    "$$item.owner",
                    new mongoose.Types.ObjectId(user["_id"]?.toString()),
                  ],
                },
              },
            },
          }
        : {};

    const $find =
      user["role"] === "admin"
        ? [
            {
              $match,
            },
          ]
        : [
            { $match },
            { $unset },
            { $addFields },
            {
              $match: {
                $expr: { $gt: [{ $size: "$products" }, 0] },
              },
            },
          ];

    // Fetch items specifically by request
    const { error, data } = await Order.aggregate($find)
      .sort({ createdAt: -1 })
      .skip(parseFloat(skip.toString()) * parseFloat(limit.toString()))
      .limit(parseFloat(limit.toString()))
      .then((res) => ({ error: false, data: res }))
      .catch((err) => ({ error: true, data: err }));

    // Populate the product owners
    await Order.populate(data, {
      path: "products.owner",
      model: User,
      select: { _id: 1, store: 1, slug: 1 },
    });

    // Do not show the items where owner has no products
    const items = data.filter((el: IOrder) => el["products"].length > 0);

    // If there's any fetching error, throw search
    if (error) throw new Error();

    // Count the aggregation length
    const [l] = await Order.aggregate($find).count("length");

    // Check if length exists
    const length = l ? l : { length: 0 };

    // Return a successful response if items were found
    return getResponse<IOrder>({
      status: "success",
      model: "order",
      data: { items, ...length },
    });
  } catch (err) {
    return getResponse<IOrder>({
      status: "error",
      model: "order",
    });
  }
};

const fetchOrdersWithoutAuth = async ({ query }: { query: IQuery }) => {
  // Fetch pagination settings from router query
  const { target } = query;

  // If there's no query, abort
  if (!target)
    return getResponse<IOrder>({
      status: "error",
      model: "order",
    });

  try {
    // Query
    const $match = {
      path: target,
    };

    // Fetch items specifically by request
    const { error, data: items } = await Order.aggregate([
      {
        $match,
      },
      {
        $project: {
          _id: 0,
          status: 1,
          path: 1,
          email: 1,
          cc: 1,
          coupon: 1,
          createdAt: 1,
          products: {
            $map: {
              input: "$products",
              as: "item",
              in: {
                _id: "$$item._id",
                owner: "$$item.owner",
                name: "$$item.name",
                variants: {
                  $map: {
                    input: "$$item.variants",
                    as: "variant",
                    in: {
                      _id: "$$variant._id",
                      name: "$$variant.name",
                      quantity: "$$variant.quantity",
                      price: "$$variant.price",
                      codes: {
                        $cond: {
                          if: {
                            $in: ["$status", ["confirmed", "unfulfilled"]],
                          },
                          then: "$$variant.codes",
                          else: null,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    ])

      .then((res) => ({ error: false, data: res }))
      .catch((err) => ({ error: true, data: err }));

    // Populate product owners
    await Order.populate(items, [
      {
        path: "products.owner",
        model: User,
        select: { _id: 1, store: 1, slug: 1 },
      },
    ]);

    // If there's any fetching error, throw search
    if (error) throw new Error();

    // Return a successful response
    return getResponse<IOrder>({
      status: "success",
      model: "order",
      data: {
        items,
        length: items.length,
      },
    });
  } catch (err) {
    return getResponse({ status: "error", model: "order" });
  }
};

type IUpdateOrder = IOrder & {
  notes: string;
  mode: "update" | "add";
};

const updateOrder = async ({
  body,
  user,
  website,
}: {
  body: IUpdateOrder;
  user: IUser;
  website: IWebsiteSettings;
}) => {
  // Destructure request body
  const {
    products, // Excluding current products so they don't get changed
    mode,
    _id,
    notes,
    ...data
  } = body;

  try {
    // Find current order
    const currentOrder = await Order.findOne({ _id });
    // If order was not found
    if (!currentOrder) {
      throw new Error("Something went wrong.");
    }

    // Get the IDs of current products
    const currentProductIds = products.map((el) => el._id.toString());

    // Get the other resellers products by removing the new products from old order
    const olderProducts = currentOrder["products"].filter(
      (el) => !currentProductIds.includes(el._id.toString())
    );

    // Attach current user on data
    data["user"] = user["_id"];

    // Replace issues if we have notes
    if (notes) {
      data["issuesReplaced"] = true;

      // Send email
      await sendEmail({
        fromName: website["companyName"],
        fromEmail: website["mailSender"],
        to: currentOrder["email"],
        logo: website["websiteLogo"],
        subject: "Order modified",
        apiKey: website["mailKey"],
        body: `
        <h2>Your order was modified</h2>
        <p>Order ${_id} was modified by our support team. Please follow the link below to view
          the updated order.</p>
        <p>Support notes:</p>
        <p style="padding: 10px; background-color: #f8f8f8; border-radius: 10px;">${notes}</p>
        <a target="_blank" href="${process.env.NEXTAUTH_URL}/order/${_id}">
          <button>View order</button>
        </a>
      `,
      })
        .then(() => ({ success: true }))
        .catch(() => ({ success: false }));
    }

    // Find order and update it
    const order = await Order.findOneAndUpdate(
      { _id },
      { ...data, products: [...olderProducts, ...products] },
      {
        new: true,
      }
    ).lean();

    // If order couldn't be updated, or found for some reason
    // throw an error
    if (!order) {
      throw new Error("Something went wrong.");
    }

    // Return a successful response
    return getResponse<IOrder>({
      status: "success",
      model: "order",
      data: {
        items: [order],
        length: 1,
      },
    });
  } catch (err) {
    // Return an error
    return getResponse({ status: "error", model: "order" });
  }
};

interface IDeleteOrder {
  query: IQuery;
  user: IUser;
}
const deleteOrder = async ({ query, user }: IDeleteOrder) => {
  // Get the target order _id from request Query
  const { target } = query;

  try {
    // Check if user is not an admin and wants to delete
    // someone elses order
    if (user["role"] !== "admin")
      throw new Error("You don't have access to delete this order");

    // Find order and update it
    await Order.findOneAndDelete(
      { _id: target },
      {
        new: true,
      }
    );

    // Return a successful response
    return getResponse<IOrder>({
      status: "success",
      model: "order",
      data: {
        items: [],
        length: 1,
      },
    });
  } catch (err) {
    // Return an error
    return getResponse({ status: "error", model: "order" });
  }
};

export {
  fetchOrdersWithAuth,
  fetchOrdersWithoutAuth,
  updateOrder,
  deleteOrder,
};
