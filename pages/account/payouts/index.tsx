// Global containers
import { Payouts } from "@containers/account";

export default Payouts;

// Check session before rendering Page
import { checkSession } from "@utils/server";

// Core types
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (context) =>
  checkSession({ context, role: ["admin", "reseller"] });
