// Core types
import type { NextApiRequest, NextApiResponse } from "next";

// Global models
import { Website, Page } from "api/models";

// Global utils
import { getQuery, database, getResponse } from "@utils/server";

// Global types
import { IResponse } from "@types";

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

  // Manage POST requests, used for faq fetches
  if (req.method === "GET") {
    // Declare response object
    let response: IResponse;

    // Fetch pagination settings from router query
    const {
      query: { limit, skip, ...query },
    } = req;

    // Restructure query based on order schema
    const $find = getQuery({
      query,
      initial: {},
      map: {
        search: (val) => ({
          title: { $regex: new RegExp(val.toString(), "i") },
        }),
      },
    });

    try {
      // Fetch items specifically by request
      const { error, data: items } = await Page.find($find)
        .sort({ createdAt: -1 })
        .skip(Number(skip) * Number(limit))
        .limit(Number(limit))
        .then((res) => ({ error: false, data: res }))
        .catch((err) => ({ error: true, data: err }));

      // If there's any fetching error, throw search
      if (error) throw new Error();

      // Count fetched items
      const length = await Page.find($find).sort({ createdAt: -1 }).count();

      // Return a successful response if items were found
      // Return a successful response if items were found
      if (items || length === 0)
        response = {
          code: 200,
          status: "success",
          data: { items, length },
          message: "Successfully fetched pages.",
        };
      else
        response = {
          code: 404,
          status: "error",
          message: "Could not find any pages.",
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

  // Manage POST requests, used for faq updates
  if (req.method === "POST") {
    // Destructure request
    const { body } = req;

    try {
      // Find faq and update it
      const faq = await Page.create(body);

      // Return error response
      return res.send({
        code: 200,
        status: "success",
        message: "Faq successfully created.",
        data: { items: [faq], length: 1 },
      });
    } catch (err) {
      // Return error response
      return res.send({
        code: 500,
        status: "error",
        message: "Couldn't create faq, something went wrong.",
      });
    }
  }

  // Manage PUT requests, used for faq updates
  if (req.method === "PUT") {
    // Destructure request
    const {
      body: { target: _id, ...data },
    } = req;

    try {
      // Find faq and update it
      const faq = await Page.findOneAndUpdate(
        { _id },
        { ...data },
        {
          new: true,
        }
      ).lean();

      // Return error response
      return res.send({
        code: 200,
        status: "success",
        message: "Faq successfully updated.",
        data: { items: [faq], length: 1 },
      });
    } catch (err) {
      // Return error response
      return res.send({
        code: 500,
        status: "error",
        message: "Couldn't update faq, something went wrong.",
      });
    }
  }

  // Manage DELETE requests, used for faq updates
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
      // someone elses faq
      if (role !== "admin")
        throw new Error("You don't have access to delete this faq");

      // Find faq and update it
      const deleted = await Page.findOneAndDelete(
        { _id },
        { new: true }
      ).lean();

      // Return error response
      return res.send({
        code: 200,
        status: "success",
        message: "Faq successfully deleted.",
        data: { items: [deleted], length: 1 },
      });
    } catch (err) {
      // Return error response
      return res.send({
        code: 500,
        status: "error",
        message: "Couldn't delete faq, something went wrong.",
      });
    }
  }
}
