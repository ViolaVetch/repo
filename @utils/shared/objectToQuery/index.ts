import { IQuery, QueryType } from "@types";

export const objectToQuery = ({ query }: { query: IQuery }) => {
  // Handle query if exists
  if (query)
    return Object.entries(query).reduce(
      (prev: string, [key, val]: [string, QueryType]) => {
        let item: string;

        // Check if val is an array and it's empty, do not continue
        if (Array.isArray(val) && val && val.length === 0) return prev;

        // Convert item to a string
        switch (val) {
          case "object":
            item = Array(val).join(", ");
            break;
          default:
            item = val !== undefined ? val.toString() : "";
            break;
        }

        // Check if prev exists
        if (prev) {
          return val !== undefined ? `${prev}&${[key]}=${item}` : `${prev}`;
        }

        // Continue
        return val !== undefined ? `${[key]}=${item}` : ``;
      },
      ``
    );

  return ``;
};
