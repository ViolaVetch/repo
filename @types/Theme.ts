// Global app constants
import {
  THEMEBREAKPOINTS,
  THEMECOLORS,
  THEMESPACES,
  THEMEALIGNMENGS,
  THEMEFONTWEIGHTS,
} from "@constants";

export type ThemeBreakpointsList = typeof THEMEBREAKPOINTS[number];
export type ThemeBreakpoints<T> = { [x in ThemeBreakpointsList]?: T };

export type ThemeColors = keyof typeof THEMECOLORS;
export type ThemeSpaces = keyof typeof THEMESPACES;

export type ThemeAlignmentsList = keyof typeof THEMEALIGNMENGS;
export type ThemeAlignments<T> = {
  [x in ThemeAlignmentsList]?: T;
};

export type ThemeVariants = "primary" | "secondary" | "grey" | "light";
export type ThemeDirections = "row" | "column" | "column-reverse";
export type ThemeFlexAlignments =
  | "flex-start"
  | "center"
  | "flex-end"
  | "unset";

export type ThemeTextAlignments = "left" | "center" | "right";

export type ThemeFlexJustifyContent =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-around"
  | "space-between"
  | "space-evenly"
  | "unset";

export type ThemeFontWeights = keyof typeof THEMEFONTWEIGHTS;

export interface Theme {
  name: "light" | "dark";
  colors: {
    [x in ThemeColors]: string;
  };
  branding: {
    primaryColor: string;
    secondaryColor: string;
  };
  breakpoints: { [x in ThemeBreakpointsList]: number };
  font: {
    size: number;
    family: string;
    weight: {
      [x in ThemeFontWeights]: number;
    };
  };
  shadow: {
    size: string;
    color: string;
  };
  spaces: {
    [x in ThemeSpaces]: number | string;
  };
  defaults: {
    gutter: number;
    radius: number;
    transition: {
      speed: number;
    };
  };
}

export interface ThemeContext {
  light: Theme;
  dark: Theme;
}
