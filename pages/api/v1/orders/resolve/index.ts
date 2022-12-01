// Core types
import type { NextApiRequest, NextApiResponse } from "next";

// Global models
import { Website, Order, Product } from "api/models";
import { database } from "@utils/server";

// Global types
import { IOrder, IResponse } from "@types";

// Vendors
import { getSession } from "next-auth/react";

// Global utils
import { getResponse } from "@utils/server";

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

  // Manage PUT requests, used for order updates
  if (req.method === "POST") {
    const { body } = req;

    // Order body
    const { _id } = body as IOrder;

    try {
      let response: IResponse;

      // Find current order
      const order = await Order.findOne({ _id }).lean();
      if (!order) throw new Error("Order wasn't found");

      const products = await Promise.all(
        // Map order products
        order["products"].map(async (product) => {
          // Find the identical example of the product
          const found = await Product.findOne({ _id: product["_id"] }).lean();
          if (!found) throw new Error("Product is not found");

          // Order(Product) codes
          const variants = await Promise.all(
            product["variants"].map((variant) => {
              // Remap codes
              const codes = variant["codes"]
                .map((el) =>
                  found["codes"].filter(
                    (code) =>
                      // Check if IDs are the same
                      code["_id"].toString() == el["_id"].toString()
                  )
                )
                .flat();

              // Check if there are still codes are unfulfilled
              const unfulfilled = codes.filter((code) => code["status"] != 1);

              // Throw an error
              if (unfulfilled.length > 0)
                throw new Error("Products are not fulfilled yet");

              // Return variant
              return {
                ...variant,
                codes,
              };
            })
          );

          // Return updated product with new codes
          return { ...product, variants };
        })
      );

      // Update order
      const updatedOrder = await Order.findOneAndUpdate(
        { _id },
        {
          ...order,
          status: "confirmed",
          products,
        },
        { new: true }
      ).lean();

      // Return updated order
      response = getResponse({
        status: "success",
        model: "order",
        data: {
          items: [updatedOrder],
          length: 1,
        },
      });

      // Return response
      return res.status(response["code"]).send(response);
    } catch (e) {
      const response = getResponse({
        message: (e as Error)["message"],
        status: "error",
        model: "Order",
      });

      // Return response
      return res.status(response.code).send(response);
    }
  }

  // If user has no access, return an error
  if (!session) {
    return res
      .status(401)
      .send({ error: "Please login to perform the action." });
  }
}
