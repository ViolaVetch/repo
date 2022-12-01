// Core types
import type { NextApiRequest, NextApiResponse } from "next";

// Global models
import { Website } from "api/models";

// Global @server-side utilities
import { database } from "@utils/server";

// Global types
import { IWebsiteSettings } from "@types";

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
  const currentWebsite = await Website.findOne({});
  if (!currentWebsite) return res.status(500).send("Something went wrong");

  // Manage PUT requests, used for product updates
  if (req.method === "PUT") {
    // Destructure request
    const {
      body: { target, ...data },
    } = req;

    let website: IWebsiteSettings;

    try {
      // Find product and update it
      website = await Website.findOneAndUpdate(
        { _id: target },
        { ...data },
        {
          new: true,
        }
      ).lean();

      // Return error response
      return res.send({
        code: 200,
        success: true,
        message: "Website settings successfully updated.",
        data: { items: [website], length: 1 },
      });
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
