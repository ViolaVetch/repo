// Global containers
import { User } from "@containers/account";

// Core
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();

  const [mode, setMode] = useState<"add" | "update">(
    router.query.id === "new" ? "add" : "update"
  );

  useEffect(() => {
    const getMode = () => {
      switch (router.query?.id?.toString()) {
        case "new":
          return "add";
        default:
          return "update";
      }
    };
    router.query.id && setMode(getMode());
  }, [router.query.id]);

  return <User mode={mode} setMode={setMode} />;
};

export default index;

// Check session before rendering Page
import { checkSession } from "@utils/server";

// Core types
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (context) =>
  checkSession({ context, role: ["admin"] });
