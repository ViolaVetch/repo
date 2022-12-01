// Core
import { useContext, useEffect, useState } from "react";

// Core
import Head from "next/head";

// Global components
import {
  Notification,
  Confirmation,
  Divider,
  Header,
  Footer,
} from "@components";

// Local components
import { Nav } from "./Nav";
import View from "./View";

// Global context
import { StoreContext } from "@context";

export default function Account({
  children,
  title,
  description,
  $padding,
  ...props
}: {
  $padding?: boolean;
  [x: string]: any;
}) {
  // Core instance
  const { instance: website } = useContext(StoreContext);

  return (
    <Divider $direction="column">
      <Confirmation />
      <Notification />

      <Head>
        <title>{`${title ? title + " — " : ""}${
          website["companyName"]
        }`}</title>

        <meta name="description" content={website["websiteDescription"]} />
        <meta name="author" content={website["companyName"]} />
        <meta property="og:title" content={website["websiteTitle"]} />
        <meta property="og:image" content={`${website["websiteThumbnail"]}`} />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${website["websiteFavicon"]}`}
        />
        <meta
          property="og:description"
          content={website["websiteDescription"]}
        />
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex" />
      </Head>

      {/* Pagewide header */}
      <Header />

      {/* Children */}
      <Divider
        $padding={{
          xs: { top: 1, right: 1, bottom: 1, left: 1 },
          sm: { top: 1, right: 1, bottom: 1, left: 1 },
          lg: { top: 5, right: 5, bottom: 5, left: 5 },
        }}
        $alignItems="flex-start"
        $direction={{ xs: "column", sm: "row" }}
      >
        {/* Dashboard navigation */}
        <Nav />

        {/* Dashboard children */}
        <Divider
          $margin={{
            xs: { top: 2, left: 0 },
            sm: { top: 0, left: 1 },
            lg: { left: 5 },
          }}
          $extends="card"
          $direction="column"
          $options={{
            flex: 4,
            additionalStyles: ({ breakpoints }) => `
              width: 100%;
              min-height: 600px;
              @media (min-width: ${breakpoints["sm"]}px) {
                overflow: hidden;
              }
            `,
          }}
        >
          {children}
        </Divider>
      </Divider>

      {/* Pagewide footer */}
      <Footer />
    </Divider>
  );
}
