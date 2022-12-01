// Core types
import type { NextApiRequest, NextApiResponse } from "next";

// Global models
import { Amount, Currency, Order, User, Website } from "api/models";

// Global utilities
import { database, getResponse } from "@utils/server";

// Global types
import { IAmount, IResponse } from "@types";

// Global utils
import { getQuery } from "@utils/server";

// Vendors
import mongoose from "mongoose";
import { getSession } from "next-auth/react";

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
  if (!session || session["user"]["role"] === "user")
    return res
      .status(401)
      .send({ error: "Please login to perform the action." });

  // Manage POST requests, used for payout fetches
  if (req.method === "GET") {
    // Fetch pagination settings from router query
    const {
      query: { initial, skip, limit, oid, sellers, ...query },
    } = req;

    // Restructure query based on order schema
    const $find = getQuery({
      query,
      initial:
        session["user"]["role"] === "reseller"
          ? { owner: session["user"]["_id"] }
          : {},
      map: {
        order: (val) => ({
          order: new mongoose.Types.ObjectId(val),
        }),
      },
    });

    try {
      // Declare response object
      let response: IResponse<IAmount>;

      // Fetch items specifically by request
      const { error, data: items } = await Amount.find($find)
        .sort({ createdAt: -1 })
        .skip(Number(skip) * Number(limit))
        .limit(Number(limit))
        .populate([
          {
            path: "owner",
            model: User,
          },
          {
            path: "currency",
            model: Currency,
          },
        ])
        .then((res) => ({ error: false, data: res }))
        .catch((err) => ({ error: true, data: err }));

      // If there's any fetching error, throw search
      if (error) throw new Error();

      // Count fetched items
      const length = await Amount.find($find).sort({ createdAt: -1 }).count();

      // Return a successful response if items were found
      response = getResponse({
        status: "success",
        model: "amounts",
        data: {
          items,
          length,
        },
      });

      // Return resposne
      return res.status(response.code).send(response);
    } catch (err) {
      // Declare response object
      let response: IResponse<IAmount> = getResponse({
        status: "error",
        model: "amounts",
      });

      // Return error
      return res.status(response["code"]).send(response);
    }
  }
}
