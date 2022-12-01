// Global containers
import { Pages } from "@containers/account";

export default Pages;

// Check session before rendering Page
import { checkSession } from "@utils/server";

// Core types
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (context) =>
  checkSession({ context, role: ["admin"] });
