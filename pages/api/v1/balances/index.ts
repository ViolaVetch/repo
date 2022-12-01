// Core types
import type { NextApiRequest, NextApiResponse } from "next";

// Global models
import { Website, Currency, Amount, User } from "api/models";
import { database } from "@utils/server";

// Global types
import { IBalance, IResponse as ApiResponse } from "@types";

// Vendors
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get NextAuth session to check if user is authenticated
  const session = await getSession({ req });

  // Protected route start
  // If user has no access, return an error
  if (!session) {
    return res
      .status(401)
      .send({ error: "Please login to perform the action." });
  }

  // Wait for the server to connect with DB
  await database();

  // Find the current instance
  // If instance isn't found, return an error
  const website = await Website.findOne({});
  if (!website) return res.status(500).send("Something went wrong");

  // Manage POST requests, used for product fetches
  if (req.method === "GET") {
    // Declare response object
    let response: ApiResponse<IBalance>;

    try {
      // Find all "System" enabled currencies
      const currencies = await Currency.find({});
      const user = await User.findOne({ _id: session.user._id }).lean();

      if (!user) {
        return res
          .status(401)
          .send({ error: "Please login to perform the action." });
      }

      // go through all currencies, and find respective
      // balances and sum them up
      const balances: IBalance[] = await Promise.all(
        currencies.map(async (currency) => {
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

          // Return currency and amount of the balance
          return {
            currency,
            amount,
            isActive: found ? found.length > 0 : false,
          };
        })
      );

      // Return a successful response if items were found
      if (balances || length === 0)
        response = {
          code: 200,
          status: "success",
          data: { items: balances, length: currencies.length },
          message: "Successfully fetched balances.",
        };
      else
        response = {
          code: 404,
          status: "error",
          message: "Could not find any balances.",
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
}
