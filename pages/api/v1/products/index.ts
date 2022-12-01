// Core types
import type { NextApiRequest, NextApiResponse } from "next";

// Global models
import { Website, Product, User } from "api/models";
import { database } from "@utils/server";

// Global types
import {
  IProduct,
  IProduct as ProductType,
  IResponse as ApiResponse,
} from "@types";

// Vendors
import { getSession } from "next-auth/react";
import { isObjectEmpty } from "@utils/shared";
import { fetchProducts } from "api/controllers/products";

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

    const { query } = req;

    try {
      response = await fetchProducts({
        query,
        user: session && session["user"],
      });

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

  // Manage PUT requests, used for product updates
  if (req.method === "POST") {
    // Protected route start
    // If user has no access, return an error
    if (!session) {
      return res
        .status(401)
        .send({ error: "Please login to perform the action." });
    }

    // Declare response object
    let response: ApiResponse<ProductType>;

    // Destructure request
    const {
      body: { owner, ...body },
    } = req;

    // Structure required data
    const data = {
      ...body,
      user: session.user._id,
      owner: session.user._id,
    };

    // Store product
    const product = await Product.create(data);

    // If product exists, return a successful response
    if (product)
      response = {
        code: 200,
        status: "success",
        message: "Product was created successfully.",
        data: { items: [product], length: 1 },
      };
    else
      response = {
        code: 500,
        status: "error",
        message: "Something went wrong, please try again later.",
      };

    // Return response
    return res.status(response.code).send(response);
  }

  // Manage PUT requests, used for product updates
  if (req.method === "PUT") {
    // Destructure request
    const {
      body: { owner, mode, _id, view, path, ...data },
    } = req;

    let product: IProduct;

    try {
      // If we're just adding a view
      if (view) {
        const curr = await Product.findOne({ path }).lean();
        // Throw an error if product isn't found
        if (!curr) throw new Error();

        // Find product and update it
        product = await Product.findOneAndUpdate(
          { path },
          { views: curr.views + 1 },
          {
            new: true,
          }
        ).lean();
      } else {
        // Protected route start
        // If user has no access, return an error
        if (!session) {
          return res
            .status(401)
            .send({ error: "Please login to perform the action." });
        }

        // Attach current user on data
        data.user = session.user._id;

        // Find product and update it
        product = await Product.findOneAndUpdate(
          { _id },
          { ...data },
          {
            new: true,
          }
        ).lean();
      }

      // Return error response
      return res.send({
        code: 200,
        status: "success",
        message: "Product successfully updated.",
        data: { items: [product], length: 1 },
      });
    } catch (err) {
      // Return error response
      return res.send({
        code: 500,
        status: "error",
        message: "Couldn't update product, something went wrong.",
      });
    }
  }

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
      // Find the current product
      const product = await Product.findOne({ _id }).lean();

      // Check if user is not an admin and wants to delete
      // someone elses product
      if (
        role !== "admin" &&
        product?.owner?.toString() != session?.user._id.toString()
      )
        throw new Error("You don't have access to delete this product");

      // Find product and update it
      const deleted = await Product.findOneAndDelete(
        { _id },
        {
          new: true,
        }
      ).lean();

      // Return error response
      return res.send({
        code: 200,
        status: "success",
        message: "Product successfully deleted.",
        data: { items: [deleted], length: 1 },
      });
    } catch (err) {
      // Return error response
      return res.send({
        code: 500,
        status: "error",
        message: "Couldn't delete product, something went wrong.",
      });
    }
  }
}
