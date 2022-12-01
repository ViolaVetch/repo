// Global types
import { ThemeContext } from "@types";

const defaultTheme = {
  defaults: {
    gutter: 20,
    radius: 12,
    transition: {
      speed: 150,
    },
  },
  branding: {
    primaryColor: "#208dcf",
    secondaryColor: "#222a30",
  },
  shadow: {
    size: "-1px 0 5px",
    color: "rgba(0, 0, 0, 0.05)",
  },
  colors: {
    white: "#ffffff",
    grey: "#999999",
    primary: "#208DD0",
    secondary: "#222a30",
    link: "#F2F4F5",
    active: "#EBEEF0",
    success: "#3d9f5b",
    danger: "#dc3545",
    pending: "#f29339",
  },
  spaces: {
    0: 0,
    1: 0.5,
    2: 1,
    3: 1.5,
    4: 2,
    5: 2.5,
    6: 3,
    auto: "auto",
  },
  font: {
    size: 16,
    baseSize: 20,
    family: "Space Grotesk, sans-serif",
    weight: {
      medium: 500,
      semiBold: 600,
    },
  },
  breakpoints: {
    xs: 768,
    sm: 768,
    md: 992,
    lg: 1170,
    xl: 1440,
    xxl: 1600,
  },
};

// Export default Light and Dark themes
export const Theme: ThemeContext = {
  light: {
    name: "light",
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#5a41dc",
      border: "#eaeef2",
    },
  },
  dark: {
    name: "dark",
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: "#1b1348",
      border: "#E6E9EB",
    },
  },
};
