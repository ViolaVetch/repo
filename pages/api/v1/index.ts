// Core types
import type { NextApiRequest, NextApiResponse } from "next";

// Global models
import { Page, Website } from "api/models";
import { database } from "@utils/server";

// Global types
import type { IResponse as ApiResponse } from "@types";

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

  // Manage POST requests, used for product fetches
  if (req.method === "GET") {
    // Declare response object
    let response: ApiResponse;

    try {
      // Find the current instance
      // If instance isn't found, return an error
      const website = await Website.findOne({}).lean();
      if (!website) return res.status(500).send("Something went wrong");

      // Find all pages
      const pages = await Page.find({ visibility: true });

      // Return resposne
      return res.status(200).send({ ...website, pages });
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
