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
interface Props<T> extends MethodType<T, "GET"> {}

const getItems = async <T>({
  onSuccess,
  onError,
  dispatch,
  setLoading,
  query,
  model,
  timeout = 0,
}: Props<T>) => {
  // Start loader until Function is executed till the last line
  setLoading(true);

  // Request options
  const url = query
    ? SiteConfig.API + `/${model}?${objectToQuery({ query })}`
    : SiteConfig.API + `/${model}`;

  try {
    // Fetch data from server
    const { data } = await axios.get<IResponse<T>>(url);

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
    onError && onError(err);

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

export { getItems };
