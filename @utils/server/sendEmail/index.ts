import { emailTemplate } from "@utils/server/emailTemplate";

// Elastic email api client
const eeClient = require("elasticemail-webapiclient").client;

export const sendEmail = async ({
  apiKey,
  body,
  to,
  subject,
  fromName,
  fromEmail,
  logo,
}: {
  logo: string;
  fromName: string;
  fromEmail: string;
  apiKey: string;
  body: string;
  to: string;
  subject: string;
}) => {
  // Store api options
  const options = {
    apiKey,
    apiUri: "https://api.elasticemail.com/",
    apiVersion: "v2",
  };

  const elastic = new eeClient(options);

  // Load account data
  await elastic.Account.Load();

  // Specify parameters
  const emailParams = {
    subject,
    to,
    from: fromEmail,
    bodyHtml: emailTemplate({ body, logo }),
    fromName,
    bodyType: "Plain",
  };

  // Send email
  const client = await elastic.Email.Send(emailParams);

  // Return a success message
  if (client.success) return { client };

  // Return an error
  throw new Error("Something went wrong");
};
