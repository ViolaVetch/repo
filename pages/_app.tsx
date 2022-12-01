// Core
import { useState, useMemo } from "react";

// Core types
import type { AppProps } from "next/app";

// Core
import { FC, useContext, useEffect } from "react";
import Script from "next/script";
import Head from "next/head";

// Global utilities
import { getCookie } from "@utils/client/getCookie";

// Vendors
import { useDispatch } from "react-redux";
import { createGlobalStyle, css } from "styled-components";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion";

// Vendor types
import type { Session } from "next-auth";

// Global app style
const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video, input, select, button {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  button {
    -webkit-appearance: none;
    background-color: transparent;
    color: initial;
  }
  
  
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a { text-decoration: none; }

  // Reset end

  * {
      outline: none;
      text-decoration: none;
      box-sizing: border-box;
      ${({
        theme: {
          font: { family, weight },
        },
      }) => css`
        font-family: ${family};
        font-weight: ${weight["medium"]};
      `}
  }

  body #__next {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  html, body {
    box-sizing: border-box;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-scroll-behavior: smooth;
    -moz-scroll-behavior: smooth;
    -ms-scroll-behavior: smooth;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0;
    margin: 0;

    ${({
      theme: {
        colors,
        branding,
        font: { size, family, weight },
      },
    }) => css`
      font-style: normal;
      font-feature-settings: "kern";
      font-size: ${size}px;
      background-color: ${colors.white};
      color: ${branding.secondaryColor};
      line-height: 1.25;
      font-family: ${family};
      font-weight: ${weight["medium"]};

      strong {
        font-weight: ${weight["semiBold"]};
      }

      b {
        font-weight: ${weight["semiBold"]};
      }
    `}
  }

  body{
      background: #FAFAFB;
  }

  label.checkboxcheckbox {
      position: relative;
  }

  label.checkboxcheckbox .check-icon {
      position: relative;
      display: inline-block;
      height: 20px;
      width: 20px;
      border: solid 1px #d6dce3;
      background-color: #f0f3f6;
      border-radius: 3px;
      transition: 0.2s all ease-in-out;
  }

  label.checkboxcheckbox .check-icon:before {
      content: "";
      position: absolute;
      inset: 0;
      transition: 0.2s all ease-in-out;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg aria-hidden='true' focusable='false' data-prefix='far' data-icon='check' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='svg-inline--fa fa-check fa-w-16' style=''%3e%3cpath fill='%23fff' d='M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z' class=''%3e%3c/path%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-size: 65%;
      background-position: center center;
      transform: scale(1.3);
      opacity: 0;
  }

  label.checkboxcheckbox input[type="checkbox"] {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
  }

  label.checkboxcheckbox input[type="checkbox"]:checked + .check-icon {
      border-color: #3057d5;
      background: #3057d5;
  }

  label.checkboxcheckbox input[type="checkbox"]:checked + .check-icon:before {
      transform: scale(1);
      opacity: 1;
  }

  label.checkboxcheckbox input[type="checkbox"]:focus ~ .check-icon {
      box-shadow: 0 0 0 4px rgba(47, 86, 212, 0.1);
  }

label.checkboxcheckbox > div:first-child {
    display: inline-flex;
}

  label.checkboxcheckbox.checkbox-square .check-icon {
      border-radius: 0;
  }

  label.checkboxcheckbox.checkbox-circular .check-icon {
      border-radius: 50%;
  }

  label.checkboxcheckbox.has-label {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-gap: 10px;
      align-items: center;
  }

  label.checkboxcheckbox.has-label-multiple {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-gap: 10px;
      align-items: flex-start;
  }

  label.checkboxcheckbox.has-label-multiple .check-icon {
      top: 5px;
  }

  label.checkboxradio {
      position: relative;
  }

  label.checkboxradio .radio-icon {
      position: relative;
      display: inline-block;
      width: 20px;
      height: 20px;
      border: solid 1px #d6dce3;
      background-color: #f0f3f6;
      border-radius: 50%;
      transition: all 0.2s ease-in-out;
  }

  label.checkboxradio .radio-icon:before {
      content: "";
      position: absolute;
      inset: 0;
      transition: all 0.2s ease-in-out;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='circle' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='svg-inline--fa fa-circle fa-w-16'%3e%3cpath fill='%23fff' d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z' class=''%3e%3c/path%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: center center;
      opacity: 0;
  }

  label.checkboxradio input[type="radio"] {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
  }

  label.checkboxradio input[type="radio"]:checked + .radio-icon {
      background: #2f57d5;
      border-color: #2f57d5;
  }

  label.checkboxradio input[type="radio"]:checked + .radio-icon:before {
      transform: scale(0.5);
      opacity: 1;
  }

  label.checkboxradio input[type="radio"]:focus ~ .radio-icon {
      box-shadow: 0 0 0 4px rgba(47, 86, 212, 0.1);
  }

  label.checkboxradio > div:first-child {
      display: inline-flex;
  }

  label.checkboxradio.has-label {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-gap: 10px;
      align-items: center;
  }

  label.checkboxradio.has-label-multiple {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-gap: 10px;
      align-items: flex-start;
  }

  label.checkboxradio.has-label-multiple .radio-icon {
      top: 5px;
  }

  label.checkboxswitch {
      --switch-size: 40px;
      --thumb-gap: 4px;
      --thumb-size: calc(var(--switch-size) * 0.55 - var(--thumb-gap));
      --thumb-active-offset: calc(var(--switch-size) / 2);
      --track-radius: calc(var(--switch-size) / 1.6666);
      --thumb-color: #fff;
      --track-color: rgba(0, 0, 0, 0.07);
      --accent-color: #2f57d4;
      --transition: 200ms ease;
  }

  label.checkboxswitch .track {
      width: var(--switch-size);
      height: calc(var(--switch-size) / 1.6666);
      background: var(--track-color);
      border-radius: var(--track-radius);
      border-radius: calc(var(--track-radius) / 2);
      display: flex;
      align-items: center;
      box-shadow: inset 0px 0px 4px -2px rgba(0, 0, 0, 0.129);
      transition: 250ms ease;
  }

  label.checkboxswitch .thumb {
      display: inline-block;
      background: var(--thumb-color);
      width: var(--thumb-size);
      height: var(--thumb-size);
      border-radius: 50%;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.17);
      transform: translateX(var(--thumb-gap));
      transition: transform 250ms ease-in-out;
  }

  label.checkboxswitch input[type="checkbox"] {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
  }

  label.checkboxswitch input[type="checkbox"]:checked + .track {
      background: var(--accent-color);
  }

  label.checkboxswitch input[type="checkbox"]:checked + .track .thumb {
      transform: translateX(var(--thumb-active-offset));
  }

  label.checkboxswitch input[type="checkbox"]:focus + .track {
      box-shadow: inset 0px 0px 4px 1px rgba(0, 0, 0, 0.09);
  }

  label.checkboxswitch.has-inidicator .thumb {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
  }

  label.checkboxswitch.has-inidicator .thumb:before {
      content: "";
      position: absolute;
      width: 2px;
      height: 6px;
      background: #d71830;
  }

  label.checkboxswitch.has-inidicator input[type="checkbox"]:checked + .track .thumb:before {
      background: var(--accent-color);
  }

  label.checkboxswitch.has-label {
      display: grid;
      grid-template-areas: "col-1 col-2 col-3";
      grid-gap: 10px;
      align-items: center;
  }

  label.checkboxswitch.has-label .off {
      color: rgba(0, 0, 0, 0.6);
      grid-area: col-1;
      transition: var(--transition);
  }

  label.checkboxswitch.has-label .on {
      color: rgba(0, 0, 0, 0.3);
      grid-area: col-3;
      transition: var(--transition);
  }

  label.checkboxswitch.has-label .track {
      grid-area: col-2;
  }

  label.checkboxswitch.has-label input[type="checkbox"]:checked ~ .on {
      color: rgba(0, 0, 0, 0.6);
  }

  label.checkboxswitch.has-label input[type="checkbox"]:checked ~ .off {
      color: rgba(0, 0, 0, 0.3);
  }

  #root .ql-container {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      background: transparent;
      border: 0;
  }

  #root .ql-snow.ql-toolbar {
      display: block;
      background: #ffffff;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border: 1px solid #eaeef2 !important;
      border-bottom: 0px;
      padding: .75em .5em;
  }

  #root .ql-editor {
      min-height: 18em;
  }

  #root .ql-formats{
      fill: #455560 !important;
      stroke: #455560 !important;
  }

  #root .ql-editor{
      font-size: 1.2em !important;
      
  ${({ theme: { font } }) => css`
    font-weight: ${font["weight"]["medium"]};
  `}
  }
`;

// Redux state management
import { loadCart } from "redux/cartSlice";
import { Reduxium } from "configs/Redux.config";

// Global context
import { Store, StoreContext } from "@context";
import { NextApiRequest } from "next";

interface App
  extends AppProps<{
    session: Session;
  }> {
  instance: any; // To be updated
}

const CustomHead: FC = () => {
  const { instance } = useContext(StoreContext);

  useEffect(() => {
    // Overwrite types
    (window as any).$crisp = [];
    (window as any).CRISP_WEBSITE_ID = instance?.crispApi;

    (() => {
      const d = document;
      const s: any = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("body")[0].appendChild(s);
    })();
  });

  return (
    <Head>
      {instance?.googleApi && (
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
          ga('create', ${
            instance.googleApi ? `${instance.googleApi}` : ""
          } 'auto');
          ga('send', 'pageview');
        `}
        </Script>
      )}
    </Head>
  );
};

function App({ Component, pageProps, ...props }: App) {
  // Store instance that comes from properties
  const [ins, setIns] = useState(props.instance);
  // Memoize it so we don't loose state on slight component updates
  const instance = useMemo(() => ins, [ins]);

  useEffect(() => {
    // In case instance does not exist or it's not fetched,
    // check if we have the cookie with the name instance
    if (!ins && document && document.cookie) {
      setIns(
        props.instance ? props.instance : JSON.parse(getCookie("instance"))
      );
    }
  }, [ins, props.instance]);

  // Use dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    // Store instance on localStorage until found otherwise
    dispatch(loadCart());
  }, []);

  return (
    <SessionProvider
      refetchInterval={30}
      refetchOnWindowFocus={true}
      session={pageProps?.session}
    >
      <Script
        src="https://www.google-analytics.com/analytics.js"
        strategy="afterInteractive"
      />
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      <Script src="https://commerce.coinbase.com/v1/checkout.js?version=201807" />

      <Store {...{ instance }}>
        <CustomHead />

        <GlobalStyle />

        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} />
        </AnimatePresence>
      </Store>
    </SessionProvider>
  );
}

// @server-only import
import { getInstance } from "@utils/server/getInstance";

App.getInitialProps = async ({
  ctx: { req, ...ctx },
}: {
  ctx: { req: NextApiRequest };
}) => {
  // Make sure that we're accessing @server
  if (req) {
    // Fetch current hyperscale instance to get hyperscale:owner
    const { err, instance } = await getInstance();

    // If core instance returns an error, cancels request
    if (err) return { instance: false };

    // Current instance exits, if yes, store it, if not, return empty one
    return { instance };
  }

  // If not, return a false instance
  return {};
};

export default Reduxium.withRedux(App);
