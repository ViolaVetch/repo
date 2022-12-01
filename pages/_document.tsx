// Core
import Document from "next/document";

// Vendors
import { ServerStyleSheet } from "styled-components";

// @server-side elements
import { getInstance } from "@utils/server/getInstance";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    if (ctx.req) {
      // Make sure we're only doing this for the correct route
      // Fetch current hyperscale instance to get hyperscale:owner
      const { err, instance } = await getInstance();

      console.log(err, instance, "Making sure getInstance works properly");

      if(!err)
        // Every time the page refreshes, set cookies
        ctx.res?.setHeader("set-cookie", [
          `instance=${JSON.stringify(instance)}; max-age=${
            process.env.MAX_AGE
          }; path=/; samesite=lax;`,
        ]);
    }

    try {
      ctx.renderPage = (): any =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      
      return {
        ...initialProps,
        styles: (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
              rel="stylesheet"
            />

            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
