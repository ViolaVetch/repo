// Core
import Head from "next/head";

// Local components
import Login from "./Login";

// Global components
import { Divider } from "@components";
import { Normal } from "@components/Layouts";

const Auth = () => {
  return (
    <Normal title="Sign-in">
      <Head>
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex" />
      </Head>

      <Divider
        $margin={{ top: "auto", bottom: "auto", left: "auto", right: "auto" }}
        $padding={6}
        $alignItems="center"
        $justifyContent="center"
        $options={{
          additionalStyles: () => `
            width: 100%;
            background: #fafafb;
          `,
        }}
      >
        <Divider
          $options={{
            additionalStyles: () => `
              width: 450px;
              max-width: calc(100% - 30px);
              margin-left: auto;
              margin-right: auto;
              padding: 2em;
              background: white;
              border: 1px solid #eaeef2;
              border-radius: 1em;
          `,
          }}
        >
          <Login />
        </Divider>
      </Divider>
    </Normal>
  );
};

export { Auth };
