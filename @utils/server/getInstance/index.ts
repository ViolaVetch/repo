import SiteConfig from "configs/Site.config";

// Local types @res
interface Response {
  err: boolean;
  msg: string;
  instance: any;
}

/**
 *
 * @returns An object with .err indicator(boolean), .msg status message and .instance? if there's one
 */
export const getInstance = async (): Promise<Response> => {
  const url = `${process.env.NEXTAUTH_URL}/api/v1`;

  const requestOptions: any = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    // Fetch instance
    const res = await fetch(url, requestOptions);
    // Fetched
    const data = await res.json();

    // Return found instance
    return {
      err: false,
      msg: "Successfully fetched",
      instance: data,
    };
  } catch (err) {
    // Return error
    return {
      err: true,
      msg: "Something went wrong",
      instance: null,
    };
  }
};
