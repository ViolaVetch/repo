// Global models
import { Order, Payout, Product, User } from "api/models";

// Global types
import {
  IOrder,
  IOrderVariant,
  IQuery,
  IStat,
  User as IUser,
  ICoupon,
} from "@types";

// Global utils
import { getQuery, getResponse, getPeriod } from "@utils/server";

// Vendors
import mongoose from "mongoose";

// Local utils
// Check if there are any codes within product which has been replaced
const getReplacedItemsLength = (next: IOrder) =>
  next.products.reduce((prev, next) => {
    const variants: number = next.variants.reduce((prev, next) => {
      const replaced = next.codes.filter((code) => code.replacement);
      return prev + replaced.length;
    }, 0);

    return prev + variants;
  }, 0);

// Filter orders who have issues, resolved or unresolved
const countOrderIssues = (areResolved: boolean, orders: IOrder[]) =>
  orders.reduce((prev, next) => {
    let count = prev;
    let replaced = areResolved
      ? !next["issuesReplaced"]
      : next["issuesReplaced"];

    const products = getReplacedItemsLength(next);

    if (products > 0 && replaced) {
      count++;
    }

    return count;
  }, 0);

// Get paid orders revenue
const revenue = async ({ orders }: { orders: IOrder[] }) => {
  // Reduce confirmed orders revenue
  const reducedProducts = await Promise.all(
    orders.map(async (order) =>
      order["products"].reduce((prev: number, next) => {
        let coupon: ICoupon | null = null;

        if (order["coupon"]) {
          coupon = order["coupon"];
        }

        // Reduce variants price * quantity
        const reducedTotal = reduceVariants(next["variants"]);
        const total =
          coupon && parseFloat(coupon["sale"].toString())
            ? reducedTotal -
              reducedTotal * (parseFloat(coupon["sale"].toString()) / 100)
            : reducedTotal;

        return prev + total;
      }, 0)
    )
  );

  // Reduce the reduced products to a total sum
  const sum = reducedProducts.reduce((prev, next) => prev + next, 0);

  // Return the sum
  return sum;
};

// Reduce each products variants quantity to a final count
const reduceVariants = (variants: IOrderVariant[]) =>
  variants.reduce((prev, next) => prev + next["price"] * next["quantity"], 0);

// Get the revenue
const profit = async ({
  orders,
  type,
}: {
  orders: IOrder[];
  type: "admin" | "reseller";
}) => {
  // Reduce confirmed orders revenue
  const reducedProducts = await Promise.all(
    orders.map(async (order) =>
      order["products"].reduce((prev: number, next) => {
        let coupon: ICoupon | null = null;

        if (order["coupon"]) {
          coupon = order["coupon"];
        }

        // Reduce variants price * quantity
        const reducedTotal = reduceVariants(next["variants"]);
        const total =
          coupon && parseFloat(coupon["sale"].toString())
            ? reducedTotal -
              reducedTotal * (parseFloat(coupon["sale"].toString()) / 100)
            : reducedTotal;

        /**
         * If owner doesnt exist, return the total  */
        if (!next["owner"]) return prev + total;

        // Infer type usage to User Interface
        const owner = next["owner"] as IUser;

        // Check if percentage exists, as it's undefined on the user level
        const percentage = owner["percentage"] ? owner["percentage"] : 100;

        // Get profit
        const profit =
          type === "admin"
            ? total - (percentage / 100) * total
            : (percentage / 100) * total;

        return prev + profit;
      }, 0)
    )
  );

  // Reduce the reduced products to a total sum
  const sum = reducedProducts.reduce((prev, next) => prev + next, 0);

  // Return the sum
  return sum;
};

const getUserStats = async () => {
  // Find all orders
  const orders = await Order.find({}).lean();

  // Organize response
  const items: IStat[] = [
    {
      type: "orders-total",
      label: "Total orders",
      quantity: orders.length,
    },
    {
      type: "orders-with-issues",
      label: "Unresolved orders",
      quantity: countOrderIssues(true, orders),
    },
    {
      type: "orders-replaced",
      label: "Resolved orders",
      quantity: countOrderIssues(false, orders),
    },
  ];

  // Return list of stats
  return getResponse<IStat>({
    status: "success",
    model: "stats",
    data: { items, length: items.length },
  });
};

const getAdminStats = async ({ query }: { query: IQuery }) => {
  const $find = getQuery({
    query,
    initial: {},
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
    },
  });

  // Find all orders
  const orders = await Order.find($find).count();

  // Find all confirmed orders
  const paidOrders = await Order.find({
    ...$find,
    status: "confirmed",
  })
    .populate([
      {
        path: "products",
        populate: [
          {
            path: "owner",
            model: User,
          },
        ],
      },
    ])
    .lean();

  // Find all resellers
  const resellers = await User.find({ ...$find, role: "reseller" }).count();

  // Find all products
  const products = await Product.find($find).count();

  // Find all products
  const payouts = await Payout.find({ ...$find, paid: false }).count();

  // Organize response
  const items: IStat[] = [
    {
      type: "orders-total",
      label: "Total orders",
      quantity: orders,
    },
    {
      type: "orders-total-confirmed",
      label: "Total confirmed orders",
      quantity: paidOrders.length,
    },
    {
      type: "products-total",
      label: "Total products",
      quantity: products,
    },
    {
      type: "resellers-total",
      label: "Total resellers",
      quantity: resellers,
    },
    {
      type: "payouts-pending",
      label: "Payouts pending",
      quantity: payouts,
    },
    {
      type: "revenue-total",
      label: "Revenue",
      quantity: await revenue({ orders: paidOrders }),
    },
    {
      type: "profit-total",
      label: "Profit",
      quantity: await profit({ orders: paidOrders, type: "admin" }),
    },
  ];

  // Return list of stats
  return getResponse<IStat>({
    status: "success",
    model: "stats",
    data: { items, length: items.length },
  });
};

const getResellerStats = async ({
  user,
  query,
}: {
  user: IUser;
  query: IQuery;
}) => {
  const $find = getQuery({
    query,
    initial: {},
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
    },
  });

  // Find all orders
  // Fetch items specifically by request
  const orders: IOrder[] = await Order.aggregate([
    {
      $match: $find,
    },
    {
      $addFields: {
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
      },
    },
  ]);

  // Populate above orders
  await Order.populate(orders, [
    {
      path: "products",
      populate: [
        {
          path: "owner",
          model: User,
        },
      ],
    },
  ]);

  // Filter orders only by the owner
  const filteredOrders = orders.filter((el) => el.products.length > 0);
  // Filter paid orders (with Confirmed status)
  const paidOrders = filteredOrders.filter(
    (el) => el["status"] === "confirmed"
  );

  // Find all products
  // Based on the users id as owner
  const products = await Product.find({
    ...$find,
    owner: user["_id"].toString(),
  }).count();

  // Organize response
  const items: IStat[] = [
    {
      type: "orders-total",
      label: "Total orders",
      quantity: filteredOrders.length,
    },
    {
      type: "profit-total",
      label: "Profit",
      quantity: await profit({ orders: paidOrders, type: "reseller" }),
    },
  ];

  // Return list of stats
  return getResponse<IStat>({
    status: "success",
    model: "stats",
    data: { items, length: items.length },
  });
};

export { getUserStats, getAdminStats, getResellerStats };
