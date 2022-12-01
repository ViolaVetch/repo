// @ts-nocheck

// Vendors
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

// Global types
import { User as UserType } from "@types";

// Global utilities
import { database } from "@utils/server";

// Global models
import { User } from "api/models";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    Credentials({
      name: "SignIn",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Check if credentials exist, otherwise throw an error
        if (!credentials)
          throw new Error("Please enter a valid email and password");

        // Grab email and password from the submitted form
        const { email, password } = credentials;

        // Await database
        await database();

        // Search for a user by email
        const user = await User.findOne({
          email,
        })
          .select("+password")
          .lean();

        // If user doesn't exist, throw an error
        if (!user) throw new Error("Incorrect password");

        // Compare password with encryption
        const isPasswordMatch = await bcrypt.compare(
          password,
          user.password as string
        );
        // Throw an error if password doesn't match
        if (!isPasswordMatch) throw new Error("Incorrect password");

        // If user is inactive, throw them to verification page
        if (user.active != true) {
          throw new Error("Verification failed");
        }

        // Return found user
        return user;
      },
    }),
  ],

  secret: process.env.SECRET,

  session: {
    strategy: "jwt",
    maxAge: 6000,
  },

  jwt: {
    secret: process.env.SECRET,
  },

  callbacks: {
    async session({ session, token: { user } }) {
      // Assign user on the current session
      user && (session.user = user as UserType);

      return session;
    },
    async jwt({ token, user }) {
      // Assign current token to the user object
      user && (token.user = user);

      return token;
    },
  },

  // Enable debug messages in the console if you are having problems
  debug: true,
});
