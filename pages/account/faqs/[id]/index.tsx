// Global containers
import { FAQ } from "@containers/account";

// Core
import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();

  return <FAQ mode={router.query.id === "new" ? "add" : "update"} />;
}

// Check session before rendering Page
import { checkSession } from "@utils/server";

// Core types
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (context) =>
  checkSession({ context, role: ["admin"] });
