// Global containers
import { Auth } from "@containers/auth";

export default Auth;

// Vendors
import { getSession } from "next-auth/react";

// Core types
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Wait to get the session if user is logged in
  const session = await getSession(context);

  // If we have a user, return to Dashboard
  if (session) {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
