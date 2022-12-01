// Core types
import type { NextApiRequest, NextApiResponse } from "next";

// Global models
import { Website, Product, User, Currency } from "api/models";
import { database } from "@utils/server";

// Global types
import { ICurrency, IResponse as ApiResponse } from "@types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Wait for the server to connect with DB
  await database();

  // Find the current instance
  // If instance isn't found, return an error
  const website = await Website.findOne({});
  if (!website) return res.status(500).send("Something went wrong");

  // Manage POST requests, used for product fetches
  if (req.method === "GET") {
    // Extract request query params
    const { query } = req;

    // Declare response object
    let response: ApiResponse;

    // Restructure query based on Collection schema
    const getQuery = (query: { [x: string]: string | string[] | undefined }) =>
      Object.entries(query).reduce((p: {}, [key, val]: any) => {
        switch (key) {
          default:
            return { ...p, [key]: val };
        }
      }, {});

    try {
      const { error, data: items } = await Currency.find(getQuery(query))
        .then((res) => ({ error: false, data: res }))
        .catch((err) => ({ error: true, data: err }));

      // Currencies length
      const length = await Currency.find({}).count();

      // Notify maintainers for app issues.
      response = {
        code: 200,
        status: "success",
        data: { items, length },
        message: "Successfully fetched currencies.",
      };
    } catch (err) {
      // Notify maintainers for app issues.
      response = {
        code: 500,
        status: "error",
        message: "Something went wrong.",
      };
    }

    // Return error
    return res.status(response.code).send(response);
  }
}
