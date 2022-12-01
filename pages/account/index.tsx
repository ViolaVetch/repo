// Global containers
import { Dashboard } from "@containers/account";

export default Dashboard;

// Check session before rendering Page
import { checkSession } from "@utils/server";

// Core types
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (context) =>
  await checkSession({
    context,
    role: ["admin", "reseller", "user"],
  });
