// Core types
import type { NextApiRequest, NextApiResponse } from "next";

// Global models
import { Website, Coupon, Order } from "api/models";

// Global server utilities
import { database, getQuery } from "@utils/server";

// Global types
import { ICoupon, IResponse } from "@types";

// Vendors
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

  // Manage POST requests, used for coupon fetches
  if (req.method === "GET") {
    // Declare response object
    let response: IResponse;

    // Fetch pagination settings from router query
    const {
      query: { limit, skip, ...query },
    } = req;

    if (!session && !query["code"])
      return res.status(401).send("Please enter a word");

    const $find = getQuery({
      query,
      initial: {},
      map: {
        search: (val) => ({
          code: { $regex: new RegExp(val.toString(), "i") },
        }),
      },
    });

    try {
      // Fetch items specifically by request
      const { error, data: items }: { error: boolean; data: ICoupon[] } =
        await Coupon.find($find)
          .sort({ createdAt: -1 })
          .skip(Number(skip) * Number(limit))
          .limit(Number(limit))
          .populate([
            {
              path: "history",
              model: Order,
            },
          ])
          .then((res) => ({ error: false, data: res }))
          .catch((err) => ({ error: true, data: err }));

      // If there's any fetching error, throw search
      if (error) throw new Error();

      // Check if the request is to check a coupon
      if (query["code"]) {
        // Extract found coupon
        const coupon = items[0];
        // Throw an error if coupon cannot be used anymore
        if (!coupon["usable"] || coupon["history"].length >= coupon["uses"])
          throw new Error("Coupon has been used");
      }

      // Count fetched items
      const length = await Coupon.find($find).sort({ createdAt: -1 }).count();

      // Return a successful response if items were found
      if (items || length === 0)
        response = {
          code: 200,
          status: "success",
          data: { items, length },
          message: "Successfully fetched coupons.",
        };
      else
        response = {
          code: 404,
          status: "error",
          message: "Could not find any coupons.",
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

  // Protected route start
  // If user has no access, return an error
  if (!session || session["user"].role !== "admin") {
    return res
      .status(401)
      .send({ error: "Please login to perform the action." });
  }

  // Manage POST requests, used for coupon creation
  if (req.method === "POST") {
    // Destructure request
    const { body } = req;

    try {
      // Find coupon and update it
      const coupon = await Coupon.create(body);

      // Return error response
      return res.send({
        code: 200,
        status: "success",
        message: "coupon successfully created.",
        data: { items: [coupon], length: 1 },
      });
    } catch (err) {
      // Return error response
      return res.send({
        code: 500,
        status: "error",
        message: "Couldn't create coupon, something went wrong.",
      });
    }
  }

  // Manage PUT requests, used for coupon updates
  if (req.method === "PUT") {
    // Destructure request
    const {
      body: { target: _id, ...data },
    } = req;

    try {
      // Find coupon and update it
      const coupon = await Coupon.findOneAndUpdate(
        { _id },
        { ...data },
        {
          new: true,
        }
      )
        .populate([
          {
            path: "history",
            model: Order,
          },
        ])
        .lean();

      // Return error response
      return res.send({
        code: 200,
        status: "success",
        message: "coupon successfully updated.",
        data: { items: [coupon], length: 1 },
      });
    } catch (err) {
      // Return error response
      return res.send({
        code: 500,
        status: "error",
        message: "Couldn't update coupon, something went wrong.",
      });
    }
  }

  // Manage DELETE requests, used for coupon updates
  if (req.method === "DELETE") {
    // Destructure the session and the user object
    const {
      user: { role },
    } = session;

    // Destructure request
    const {
      query: { target: _id },
    } = req;

    try {
      // Check if user is not an admin and wants to delete
      // someone elses coupon
      if (role !== "admin")
        throw new Error("You don't have access to delete this coupon");

      // Find coupon and update it
      const deleted = await Coupon.findOneAndDelete(
        { _id },
        { new: true }
      ).lean();

      // Return error response
      return res.send({
        code: 200,
        status: "success",
        message: "coupon successfully deleted.",
        data: { items: [deleted], length: 1 },
      });
    } catch (err) {
      // Return error response
      return res.send({
        code: 500,
        status: "error",
        message: "Couldn't delete coupon, something went wrong.",
      });
    }
  }
}
