// Core types
import type { NextApiRequest, NextApiResponse } from "next";

// Global models
import { Website, User, Currency } from "api/models";

// Global utilities @server
// Global utils

import { getQuery, database } from "@utils/server";

// Global utilities @shared
import { isObjectEmpty } from "@utils/shared";

// Global types
import type { IProduct as ProductType, IResponse as ApiResponse } from "@types";

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

  // Manage POST requests, used for product fetches
  if (req.method === "GET") {
    let role;
    let _id;

    if (session) {
      role = session.user.role;
      _id = session.user._id;
    }

    // Declare response object
    let response: ApiResponse;

    // Check if we should filter by owner
    const isAdmin = role === "admin";
    const owner = isAdmin || !_id ? {} : { owner: _id };

    // Fetch pagination settings from router query
    const {
      query: { limit, skip, ...query },
    } = req;

    // Restructure query based on order schema
    const $find = getQuery({
      query: query,
      initial:
        !session?.user && isObjectEmpty(owner)
          ? {
              role: "reseller",
              ...owner,
            }
          : {
              role: "reseller",
            },
      map: {
        search: (val) => ({
          email: { $regex: new RegExp(val.toString(), "i") },
        }),
        _id: (val) =>
          session?.user.role == "reseller"
            ? {
                _id: session["user"]["_id"],
              }
            : {
                _id: new mongoose.Types.ObjectId(val.toString()),
              },
      },
    });

    try {
      // Fetch items specifically by request
      const { error, data: items } = await User.find(
        $find,
        session?.user.role == "admin" || session?.user.role == "reseller"
          ? {}
          : { store: 1, slug: 1, firstName: 1, lastName: 1 }
      )
        .sort({ createdAt: -1 })
        .skip(Number(skip) * Number(limit))
        .limit(Number(limit))
        .populate([
          {
            path: "wallets",
            populate: {
              path: "currency",
              model: Currency,
            },
          },
        ])
        .then((res) => ({ error: false, data: res }))
        .catch((err) => ({ error: true, data: err }));

      if (error) throw new Error();

      // Count fetched items
      const length = await User.find($find).sort({ createdAt: -1 }).count();

      // Return a successful response if items were found
      if (items && length !== 0)
        response = {
          code: 200,
          status: "success",
          data: { items, length },
          message: "Successfully fetched products.",
        };
      else
        response = {
          code: 500,
          status: "error",
          message: "Could not find any products.",
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

  // Manage POST requests, used for product updates
  if (req.method === "PUT") {
  }
}
