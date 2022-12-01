// Global models
import { Order, Product, User } from "api/models";
import { sendEmail } from "@utils/server";

// Global types
import { IProduct, IQuery, User as IUser } from "@types";

// Global utils
import { getQuery, getResponse } from "@utils/server";

// Vendors
import mongoose from "mongoose";
import { isObjectEmpty } from "@utils/shared";

const fetchProducts = async ({
  query,
  user,
}: {
  query: IQuery;
  user: IUser | null;
}) => {
  // Extracting limit and skip

  // Fetch pagination settings from router query
  const { initial, skip = 0, limit = 6, oid, sellers, ...q } = query;
  let owner: Object;

  // Check if owner exists by id or store
  if (oid || sellers) {
    // Find user based on the OID
    const users = await User.find(
      oid
        ? { _id: new mongoose.Types.ObjectId(oid.toString()) }
        : sellers
        ? { slug: { $in: (sellers as string)?.split(",") } }
        : {}
    ).lean();

    // Throw an error if user is not found
    if (!users)
      throw new Error("Something wen't wrong, please try again later");

    // Return owner id
    owner = {
      owner: { $in: users.map((el) => new mongoose.Types.ObjectId(el._id)) },
    };
  } else {
    owner = {}; // Return an empty search
  }

  // Restructure query based on order schema
  const $match = getQuery({
    query: q,
    initial:
      !user && isObjectEmpty(owner)
        ? { ...owner, visibility: true }
        : { ...owner }, // Start,
    map: {
      availability: (val) =>
        val === "false"
          ? {
              $or: [
                {
                  "codes.status": { $nin: [0] },
                },
                {
                  "codes.status": {
                    $exists: false,
                  },
                },
              ],
            }
          : {
              "codes.status": {
                $eq: 0,
              },
            },
      search: (val) => ({
        name: { $regex: new RegExp(val.toString(), "i") },
      }),
      owner: (val) => ({
        owner: new mongoose.Types.ObjectId(val),
      }),
      categories: (val) => ({
        categories: { $in: (val as string)?.split(",") },
      }),
      visibility: (val) => ({
        visibility: val === "true",
      }),
      _id: (val) => ({
        _id: new mongoose.Types.ObjectId(val),
      }),
    },
  });

  try {
    const sk = initial
      ? Number(skip) === 0
        ? 0
        : Number(initial) + Number(skip) * Number(limit)
      : Number(skip) * Number(limit);
    const lm = initial
      ? Number(skip) === 0
        ? Number(initial) + Number(limit)
        : Number(limit)
      : Number(limit);

    const $find = [
      {
        $match,
      },
    ];

    // Fetch items specifically by request
    const { error, data: items } = await Product.aggregate($find)
      .sort({ createdAt: -1 })
      .skip(sk)
      .limit(lm)
      .then((res) => ({ error: false, data: res }))
      .catch((err) => ({ error: true, data: err }));

    await Product.populate(
      items,
      user && user["role"] === "admin"
        ? [
            {
              path: "owner",
              model: User,
            },
          ]
        : [
            {
              path: "owner",
              model: User,
              select: { _id: 1, store: 1, slug: 1 },
            },
          ]
    );

    // Count the aggregation length
    const [l] = await Product.aggregate($find).count("length");

    // Check if length exists
    const length = l ? l : { length: 0 };

    // Return a successful response
    return getResponse<IProduct>({
      status: "success",
      model: "product",
      data: {
        items,
        ...length,
      },
    });
  } catch (err) {
    return getResponse({ status: "error", model: "order" });
  }
};

export { fetchProducts };
