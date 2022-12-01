// Core types
import type { NextApiRequest, NextApiResponse } from "next";

// Global models
import { Website, User, Currency } from "api/models";
import { database, getResponse } from "@utils/server";

// Global types
import { IResponse as ApiResponse } from "@types";

// Vendors
import { getSession } from "next-auth/react";
import bcrypt from "bcrypt";

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
      query: { limit, skip, ...query },
    } = req;

    // Restructure query based on Collection schema
    const getQuery = (query: { [x: string]: string | string[] | undefined }) =>
      Object.entries(query).reduce(
        (p: {}, [key, val]: any) => {
          switch (key) {
            case "search":
              return {
                ...p,
                email: { $regex: new RegExp(val.toString(), "i") },
              };
            default:
              return { ...p, [key]: val };
          }
        },
        { role: { $in: ["user"] } } // Start
      );

    try {
      // Fetch items specifically by request
      const { error, data: items } = await User.find(getQuery(query))
        .sort({ createdAt: -1 })
        .skip(Number(skip) * Number(limit))
        .limit(Number(limit))

        .then((res) => ({ error: false, data: res }))
        .catch((err) => ({ error: true, data: err }));

      // If there's any fetching error, throw search
      if (error) throw new Error();

      // Count fetched items
      const length = await User.find(getQuery(query))
        .sort({ createdAt: -1 })
        .count();

      // Return a successful response if items were found
      if (items || length === 0)
        response = {
          code: 200,
          status: "success",
          data: { items, length },
          message: "Successfully fetched users.",
        };
      else
        response = {
          code: 404,
          status: "error",
          message: "Could not find any users.",
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

  // Manage POST requests
  if (req.method === "POST") {
    let response: ApiResponse;

    // Destructure request body
    const { body } = req;

    // Check if user exists
    const found = await User.findOne({ email: body["email"] });

    // If it exists, throw an error
    try {
      if (found)
        throw new Error("Email already taken, did you forget your password?");

      // Generate a salt
      const salt = await bcrypt.genSalt(10);
      // Encrypt given password
      const hashedPassword = await bcrypt.hash(body["password"], salt);
      // Store hashed password
      body["password"] = hashedPassword;

      // Create user
      const user = await User.create({ ...body });

      // Not sure if it'll work
      const { password, ...rest } = user;

      if (!user) throw new Error("Couldn't create user");

      // Store response
      response = {
        code: 200,
        status: "success",
        message: `Something wen't wrong while trying to create the user.`,
        data: {
          items: [user],
          length: 1,
        },
      };

      // Return final response
      return res.status(response.code).send(response);
    } catch (err) {
      // Store error response
      response = getResponse({ status: "error", model: "User" });
      // Return final response
      return res.status(response.code).send(response);
    }
  }

  // Manage PUT requests
  if (req.method === "PUT") {
    let response: ApiResponse;

    try {
      const { hasNewPassword, newPassword, ...data } = req.body;

      // Check if user has a new password or keeps the old one
      const user = await User.findOne({ email: data.email });

      // If user is not found, throw an error
      if (!user) throw new Error("User wasn't found");

      console.log(hasNewPassword, newPassword);
      // If user has new password
      if (hasNewPassword) {
        // Generate salt
        const salt = await bcrypt.genSalt(10);
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        // Reinsert password on data
        data["password"] = hashedPassword;
      }

      // Store user update
      const updatedUser = await User.findByIdAndUpdate(data._id, data, {
        new: true,
      }).lean();

      console.log(updatedUser);

      // Throw an error if user can't be updated
      if (!updatedUser) throw new Error("Something went wrong");

      // Store successful response
      response = {
        code: 200,
        status: "success",
        message: "User was updated sucessfully.",
        data: {
          items: [updatedUser],
          length: 1,
        },
      };

      res.status(response.code).json(response);
    } catch (error) {
      response = getResponse({ status: "error", model: "User" });
      res.status(response.code).json(response);
    }
  }

  // Manage DELETE requests
  // Manage DELETE requests, used for product updates
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
      // someone elses product
      if (role !== "admin")
        throw new Error("You don't have access to delete this product");

      // Find product and update it
      const deleted = await User.findOneAndDelete(
        { _id },
        {
          new: true,
        }
      ).lean();

      // Return error response
      return res.send({
        code: 200,
        status: "success",
        message: "User successfully deleted.",
        data: { items: [deleted], length: 1 },
      });
    } catch (err) {
      // Return error response
      return res.send({
        code: 500,
        status: "error",
        message: "Couldn't delete user, something went wrong.",
      });
    }
  }
}
