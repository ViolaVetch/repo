// Global types
import { IQuery } from "@types";

// Restructure query based on Collection schema
export const getQuery = <T extends {}>({
  query,
  initial,
  map,
}: {
  query: IQuery;
  initial: T;
  map: { [x: string]: (value: string) => {} };
}) =>
  Object.entries(query).reduce((p: {}, [key, val]: any) => {
    if (map[key]) {
      return { ...p, ...map[key](val) };
    } else {
      return { ...p, [key]: val };
    }
  }, initial);
