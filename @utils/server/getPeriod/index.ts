// Vendors
import { DateTime } from "luxon";

// Global utils
import { addOneDay } from "@utils/shared/addOneDay";

// Get Date
type DateTypes = "today" | "last-week" | "last-month" | "last-year";
export const getPeriod = (type: DateTypes) => {
  // Find today start and end
  const today = new Date();
  const { start: todayStart, end: todayEnd } = addOneDay(
    DateTime.fromJSDate(today).toFormat("dd/M/yyyy")
  );

  // Find last weeks start and end
  const lastWeek = new Date(
    today.getFullYear() - (type == "last-year" ? 1 : 0),
    today.getMonth() - (type == "last-month" ? 1 : 0),
    today.getDate() - (type == "last-week" ? 7 : 0)
  );

  const { start } = addOneDay(
    DateTime.fromJSDate(lastWeek).toFormat("dd/M/yyyy")
  );

  switch (type) {
    case "today":
      return { createdAt: { $gte: todayStart, $lt: todayEnd } };
    default:
      return { createdAt: { $gte: start, $lt: todayEnd } };
  }
};
