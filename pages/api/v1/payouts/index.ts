// Core types
import type { NextApiRequest, NextApiResponse } from "next";

// Global models
import { Website, Currency, Amount, User, Payout, Order } from "api/models";

// Global utilities
import { database, getResponse } from "@utils/server";

// Global types
import { IPayout, IPayoutBalance, IResponse } from "@types";

// Vendors
import { getSession } from "next-auth/react";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get NextAuth session to check if user is authenticated
  const session = await getSession({ req });

  // Wait for the server to connect with DB
  await database();

  // Find the current instance
  // If instance isn't found, return an error
  const website = await Website.findOne({});
  if (!website) return res.status(500).send("Something went wrong");

  // Protected route start
  // If user has no access, return an error
  if (!session) {
    return res
      .status(401)
      .send({ error: "Please login to perform the action." });
  }

  // Manage POST requests, used for payout fetches
  if (req.method === "GET") {
    // Declare response object
    let response: IResponse<IPayout>;

    // Fetch pagination settings from router query
    const {
      query: { initial, skip, limit, oid, sellers, ...query },
    } = req;

    let owner: Object;

    // Check if owner exists by id or store
    if (sellers) {
      // Find user based on the OID
      const users = await User.find(
        sellers ? { slug: { $in: (sellers as string)?.split(",") } } : {}
      ).lean();

      // Throw an error if user is not found
      if (!users)
        throw new Error("Something wen't wrong, please try again later");

      // Return owner id
      owner = { owner: { $in: users.map((el) => el._id) } };
    } else {
      owner =
        session.user.role === "reseller" ? { owner: session.user._id } : {}; // Return an empty search
    }

    // Restructure query based on Collection schema
    const getQuery = (query: { [x: string]: string | string[] | undefined }) =>
      Object.entries(query).reduce(
        (p: {}, [key, val]: any) => {
          switch (key) {
            default:
              return { ...p, [key]: val };
          }
        },
        { ...owner } // Start
      );

    try {
      // Fetch items specifically by request
      const { error, data: items } = await Payout.find(getQuery(query))
        .sort({ createdAt: -1 })
        .skip(Number(skip) * Number(limit))
        .limit(Number(limit))
        .populate([
          {
            path: "owner",
            model: User,
          },
          {
            path: "balances",
            populate: {
              path: "wallet",
              populate: {
                path: "currency",
                model: Currency,
              },
            },
          },
        ])
        .then((res) => ({ error: false, data: res }))
        .catch((err) => ({ error: true, data: err }));

      // If there's any fetching error, throw search
      if (error) throw new Error();

      // Count fetched items
      const length = await Payout.find(getQuery(query))
        .sort({ createdAt: -1 })
        .count();

      // Return a successful response if items were found
      if (items || length === 0)
        response = {
          code: 200,
          status: "success",
          data: { items, length },
          message: "Successfully fetched payouts.",
        };
      else
        response = {
          code: 404,
          status: "error",
          message: "Could not find any payouts.",
        };

      // Return resposne
      return res.status(response.code).send(response);
    } catch (err) {
      // Notify maintainers for app issues.
      response = {
        code: 500,
        status: "error",
        message: "Something went wrong.",
      };

      // Return error
      return res.status(response.code).send(response);
    }
  }

  // Manage PUT requests, used for payout updates
  if (req.method === "POST") {
    // Declare response object
    let response: IResponse<IPayout>;

    // Destructure request
    const {
      body: { owner },
    } = req;

    // Find all "System" enabled currencies
    const currencies = await Currency.find({});
    const user = await User.findOne({ _id: session.user._id }).lean();

    if (!user) {
      return res.status(500).send({ error: "Something went wrong." });
    }

    // go through all currencies, and find respective
    // balances and sum them up
    const balances: (IPayoutBalance | undefined)[] = await Promise.all(
      currencies
        .map(async (currency) => {
          // Find amounts for this currency
          const amounts = await Amount.find({
            owner: session.user._id,
            currency: currency._id,
            paid: false,
          }).lean();

          // Does currency exist on user's wallet
          const found = user.wallets?.filter(
            (el) => el.currency?.toString() == currency._id.toString()
          );

          // Sum the entire amounts found
          const amount = amounts.reduce((prev, next) => {
            return prev + next.amount;
          }, 0);

          if (amount > 0 && found && found.length > 0)
            // Return currency and amount of the balance
            return {
              _id: new mongoose.Types.ObjectId(),
              wallet: found[0],
              amount,
              isActive: found ? found.length > 0 : false,
            };
          else {
            return undefined;
          }
        })
        .filter(async (el) => await el)
    );

    // Structure required data for the payout
    const data = {
      balances: balances.filter((el) => el),
      paid: false,
      owner: session.user._id,
      log: {
        owner: session.user,
      },
    };

    // Check if we can create a payout
    try {
      // Store payout
      const payout = await Payout.create(data);

      // Wait until the owners amount db is cleared
      await Amount.updateMany(
        { owner: session.user._id },
        { paid: true }
      ).lean();

      // If payout exists, return a successful response
      response = {
        code: 200,
        status: "success",
        message: "Payout requested successfully",
        data: { items: [payout], length: 1 },
      };
    } catch (err) {
      response = {
        code: 500,
        status: "error",
        message: "Something went wrong, please try again later.",
      };
    }

    // Return response
    return res.status(response.code).send(response);
  }

  // Manage PUT requests, used for payout updates
  if (req.method === "PUT") {
    // Protected route start
    // If user has no access, return an error
    if (!(session.user.role == "admin")) {
      return res
        .status(401)
        .send({ error: "You're not allowed to access this route." });
    }

    // Destructure request
    const {
      body: { owner, _id, path, ...data },
    } = req;

    let payout: IPayout;

    try {
      // Find payout and update it
      payout = await Payout.findOneAndUpdate(
        { _id },
        {
          ...data,
          log: { user: session.user, owner: data["log"]["owner"] },
        },
        {
          new: true,
        }
      ).lean();

      const response =
        // Return a successful response if items were found
        getResponse<IPayout>({
          status: "success",
          model: "order",
          data: { items: [payout], length: 1 },
        });

      // Return error response
      return res.status(response.code).send(response);
    } catch (err) {
      console.log(err);

      // Return error response
      return res.send({
        code: 500,
        success: false,
        message: "Couldn't update payout, something went wrong.",
      });
    }
  }
}
