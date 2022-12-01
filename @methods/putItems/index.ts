// Vendors
import axios from "axios";

// Global site configuration
import SiteConfig from "configs/Site.config";

// Global state management
import { showNotification, hideNotification } from "redux/notificationSlice";

// Global types
import type { MethodType, IResponse } from "@types";

// Declaring local interface, probability of update is high
interface Props<T = any> extends MethodType<T, "PUT"> {}

const putItems = async ({
  onSuccess,
  onError,
  dispatch,
  setLoading,
  model,
  target,
  data: body, // To be updated
  timeout,
}: Props) => {
  // Start loader until Function is executed till the last line
  setLoading(true);

  // Request options
  const url = SiteConfig.API + `/${model}`;

  try {
    // Send product on the server
    const { data } = await axios.put<IResponse>(url, {
      target,
      ...body,
    });

    // Check the status fetched
    switch (data["status"]) {
      case "success":
        // Call the success function and break the switch
        onSuccess(data);
        break;
      case "success":
        // Call the success function and break the switch
        onSuccess(data);
        break;
      case "unauthorized":
        // To be updated
        break;
    }
  } catch (err) {
    // Show an error
    dispatch(
      showNotification({
        success: false,
        message: "Something went wrong, please try again later.",
      })
    );
  } finally {
    // Stop loader
    setTimeout(() => {
      setLoading(false);
    }, timeout);
    // Hide notifications
    setTimeout(() => dispatch(hideNotification("")), 2500);
  }
};

export { putItems };
