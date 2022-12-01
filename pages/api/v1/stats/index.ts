// Core types
import type { NextApiRequest, NextApiResponse } from "next";

// Global models
import { Website } from "api/models";

// Global @server-side utilities
import { database } from "@utils/server";

// Global types
import { IResponse, IWebsiteSettings } from "@types";

// Vendors
import { getSession } from "next-auth/react";
import {
  getAdminStats,
  getResellerStats,
  getUserStats,
} from "api/controllers/stats";

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
  const currentWebsite = await Website.findOne({});
  if (!currentWebsite) return res.status(500).send("Something went wrong");

  // Manage PUT requests, used for product updates
  if (req.method === "GET") {
    const query = req["query"];

    try {
      let response: IResponse;

      /**
       * Check if logged-in user is an admin
       */ if (session["user"]["role"] === "admin")
        response = await getAdminStats({ query });
      /**
       * Check if logged in user is a reseller
       */ else if (session["user"]["role"] === "reseller")
        response = await getResellerStats({ user: session["user"], query });
      /**
       * Last, if logged in user is a customer support agent
       */ else {
        response = await getUserStats();
      }

      // Return error response
      return res.status(response.code).send(response);
    } catch (err) {
      // Return error response
      return res.send({
        code: 500,
        success: false,
        message: "Couldn't update website settings, something went wrong.",
      });
    }
  }
}
