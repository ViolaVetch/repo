// Vendors
import axios from "axios";

// Global site configuration
import SiteConfig from "configs/Site.config";

// Global state management
import { showNotification, hideNotification } from "redux/notificationSlice";

// Global utils
import { objectToQuery } from "@utils/shared";

// Global types
import type { MethodType, IResponse, IProduct } from "@types";

// Declaring local interface, probability of update is high
interface Props<T = any> extends MethodType<T, "POST"> {}

const postItems = async <T>({
  onSuccess,
  dispatch,
  setLoading,
  model,
  data: body,
}: Props<T>) => {
  // Start loader until Function is executed till the last line
  setLoading(true);

  // Request options
  const url = SiteConfig.API + `/${model}`;

  try {
    // Send product on the server
    const { data } = await axios.post<IResponse>(url, body);

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
    setLoading(false);
    // Hide notifications
    setTimeout(() => dispatch(hideNotification("")), 2500);
  }
};

export { postItems };
