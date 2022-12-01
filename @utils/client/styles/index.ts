// Global types
import type { ThemeBreakpoints, ThemeBreakpointsList, Theme } from "@types";

// Global constants
import { THEMEBREAKPOINTS } from "@constants";

// Global utilities
import { filterObject, isObjectEmpty } from "@utils/shared";

const breakpointsFetch = <T>({
  o,
  breakpoints,
  callback,
}: {
  o?: ThemeBreakpoints<T> | T;
  breakpoints: ThemeBreakpoints<number>;
  callback: (e: T) => void;
}) => {
  const filteredT =
    typeof o === "object"
      ? filterObject(
          o as ThemeBreakpointsList[] | T,
          (val: T, key: ThemeBreakpointsList) => !THEMEBREAKPOINTS.includes(key)
        )
      : {};

  const filteredBreakpoints =
    typeof o === "object"
      ? filterObject(
          o as ThemeBreakpointsList[] | T,
          (val: T, key: ThemeBreakpointsList) => THEMEBREAKPOINTS.includes(key)
        )
      : {};

  if (!isObjectEmpty(filteredT) && !isObjectEmpty(filteredBreakpoints)) {
    return (
      Object.entries(filteredBreakpoints as ThemeBreakpoints<T>).reduce(
        (previous, [key, obj]) =>
          previous +
          `@media (${key === "xs" ? "max" : "min"}-width: ${
            breakpoints[key as ThemeBreakpointsList]
          }px) {
        ${callback(obj)}
      };`,
        ``
      ) + `${callback(filteredT as T)}`
    );
  }

  if (isObjectEmpty(filteredBreakpoints)) {
    const l = typeof o === "object" ? filteredT : o;

    return `${callback(l as T)}`;
  }

  return Object.entries(filteredBreakpoints as ThemeBreakpoints<T>).reduce(
    (previous, [key, obj]) =>
      previous +
      `@media (${key === "xs" ? "max" : "min"}-width: ${
        breakpoints[key as ThemeBreakpointsList]
      }px) {
        ${callback(obj)}
      }`,
    ``
  );
};

export const getStyle = <T>({
  style,
  theme,
  callback,
}: {
  style: ThemeBreakpoints<T> | T;
  theme: Theme;
  callback: (s: T) => void;
}): string =>
  breakpointsFetch<T>({
    o: style,
    breakpoints: theme.breakpoints,
    callback: (value) => callback(value),
  });
