// Core types
import type { NextApiRequest, NextApiResponse } from "next";

// Global models
import { Website, Category, User } from "api/models";
import { database } from "@utils/server";

// Global types
import type {
  IProduct as ProductType,
  IProductCategory,
  IResponse as ApiResponse,
} from "@types";

// Vendors
import { getSession } from "next-auth/react";
import { stringToSlug } from "@utils/shared";

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
    // Declare response object
    let response: ApiResponse;

    // Fetch pagination settings from router query
    const {
      query: { limit, skip, oid },
    } = req;

    let owner: any;

    if (oid) {
      // Find user based on the OID
      const user = await User.findOne({ _id: oid }).lean();

      // Throw an error if user is not found
      if (!user)
        throw new Error("Something wen't wrong, please try again later");

      // Return owner id
      owner = user._id;
    } else {
      owner = {}; // Return an empty search
    }

    // Check if we should filter by owner
    const getQuery = (): Object => {
      return {
        ...owner,
      };
    };

    try {
      // Fetch items specifically by request
      const { error, data: items } = await Category.find(getQuery())
        .sort({ createdAt: -1 })
        .skip(Number(skip) * Number(limit))
        .limit(Number(limit))
        .then((res) => ({ error: false, data: res }))
        .catch((err) => ({ error: true, data: err }));

      // If there's any fetching error, throw search
      if (error) throw new Error();

      // Count fetched items
      const length = await Category.find(getQuery())
        .sort({ createdAt: -1 })
        .count();

      // Return a successful response if items were found
      if (items || length === 0)
        response = {
          code: 200,
          status: "success",
          data: { items, length },
          message: "Successfully fetched products.",
        };
      else
        response = {
          code: 404,
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

  // Protected routes start
  // If user has no access, return an error
  if (!session) {
    return res
      .status(401)
      .send({ error: "Please login to perform the action." });
  }

  // Manage POST requests, used for product updates
  if (req.method === "POST") {
    // Destructure request
    const { body } = req;

    try {
      // Find category and update it
      const category = await Category.create({
        ...body,
        path: stringToSlug(body["name"]),
      });

      // Return error response
      return res.send({
        code: 200,
        status: "success",
        message: "Category successfully created.",
        data: { items: [category], length: 1 },
      });
    } catch (err) {
      // Return error response
      return res.send({
        code: 500,
        status: "error",
        message: "Couldn't create category, something went wrong.",
      });
    }
  }

  // Manage PUT requests, used for product updates
  if (req.method === "PUT") {
    // Destructure request
    const {
      body: { target: _id, ...data },
    } = req;

    try {
      // Find category and update it
      const category = await Category.findOneAndUpdate(
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
        message: "Category successfully updated.",
        data: { items: [category], length: 1 },
      });
    } catch (err) {
      // Return error response
      return res.send({
        code: 500,
        status: "error",
        message: "Couldn't update category, something went wrong.",
      });
    }
  }

  // Manage DELETE requests, used for category updates
  if (req.method === "DELETE") {
    // Protected route start
    // If user has no access, return an error
    if (!session) {
      return res
        .status(401)
        .send({ error: "Please login to perform the action." });
    }

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
      // someone elses category
      if (role !== "admin")
        throw new Error("You don't have access to delete this category");

      // Find category and update it
      const deleted = await Category.findOneAndDelete(
        { _id },
        { new: true }
      ).lean();

      // Return error response
      return res.send({
        code: 200,
        status: "success",
        message: "Category successfully deleted.",
        data: { items: [deleted], length: 1 },
      });
    } catch (err) {
      // Return error response
      return res.send({
        code: 500,
        status: "error",
        message: "Couldn't delete category, something went wrong.",
      });
    }
  }
}
