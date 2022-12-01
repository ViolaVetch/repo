// Core
import { getSession } from "next-auth/react";

// Local types
type Role = "user" | "admin" | "reseller";

// Core types
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";

const checkSession = async ({
  context,
  role,
  callback,
}: {
  context: GetServerSidePropsContext;
  role: Role[];
  callback?: (a: Session) => any;
}) => {
  // Wait to get the session if user is logged in
  const session = await getSession(context);

  // Grab session url without query
  const [resolvedUrl] = context.resolvedUrl.split("?");

  const cancelRoute =
    resolvedUrl === "/"
      ? {
          props: {
            session,
          },
        }
      : {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };

  // If we don't have a user, return to Dashboard (Login for no user)
  if (!session) {
    return cancelRoute;
  }

  if (session) {
    // Check if User role is allowed to view the route
    if (!role.includes(session.user.role)) {
      return cancelRoute;
    }
  }

  // If we need to fetch some data on the back-end, we use a Callback function when the user authentication has passed
  const data = callback ? await callback(session) : "";

  return {
    props: { session, ...data },
  };
};

export { checkSession };
