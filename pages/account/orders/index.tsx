// Global containers
import { Orders } from "@containers/account";

export default Orders;

// Check session before rendering Page
import { checkSession } from "@utils/server";

// Core types
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (context) =>
  checkSession({ context, role: ["admin", "reseller", "user"] });
