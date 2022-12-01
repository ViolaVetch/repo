export const emailTemplate = ({
  body,
  logo,
}: {
  /** Provide logo URL as a string */
  logo: string;
  /** HTML only that'll be rendered inside email body */
  body: string;
}): string => `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:v="urn:schemas-microsoft-com:vml"
    lang="en"
  >
    <head>
      <link
        rel="stylesheet"
        type="text/css"
        hs-webfonts="true"
        href="https://fonts.googleapis.com/css?family=Lato|Lato:i,b,bi"
      />
      <title>Email template</title>
      <meta property="og:title" content="Email template" />

      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

      <meta http-equiv="X-UA-Compatible" content="IE=edge" />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <style type="text/css">
        a {
          text-decoration: underline;
          color: inherit;
          font-weight: bold;
          color: #222a30;
        }

        h1 {
          font-size: 56px;
        }

        h2 {
          font-size: 28px;
          font-weight: 900;
        }

        p {
          font-weight: 100;
        }

        td {
          vertical-align: top;
        }

        #email {
          margin: auto;
          width: 600px;
          background-color: white;
        }

        button {
          font: inherit;
          background-color: #5a41dc;
          border: none;
          padding: 10px 40px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 900;
    font-size: 15px;
          color: white;
          border-radius: 40px;
        }

        .subtle-link {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #cbd6e2;
        }
      </style>
    </head>

    <body
      bgcolor="#F5F8FA"
      style="
        width: 100%;
        margin: auto 0;
        padding: 0;
        font-family: Lato, sans-serif;
        font-size: 18px;
        color: #222a30;
        word-break: break-word;
      "
    >
      <! View in Browser Link -->

      <div id="email">
        <! Logo -->
        <table role="presentation" width="100%">
          <tr>
            <td
              bgcolor="#5a41dc"
              align="center"
              style="color: white; padding-top: 40px; padding-bottom: 40px"
            >
              <img
                alt="Flower"
                src="${logo}"
                width="190px"
                align="middle"
              />
            </td>
          </tr>
        </table>

        <! First Row -->
        <table
          role="presentation"
          border="0"
          cellpadding="0"
          cellspacing="10px"
          style="padding: 30px 30px 30px 60px"
        >
          <tr>
            <td>
              ${body}
            </td>
          </tr>
        </table>

        <! Unsubscribe Footer -->
        <table role="presentation" bgcolor="#F5F8FA" width="100%">
          <tr>
            <td align="left" style="padding: 30px 30px">
              <p class="subtle-link">
                Please delete this email if it was not meant for you.
              </p>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>
`;
