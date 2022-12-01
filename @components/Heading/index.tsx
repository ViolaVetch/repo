// Core types
import { Divider } from "@components/Divider";
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

type AS = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

// Global utilities, @client-only
import { getStyle } from "@utils/client";

// Global types
import type {
  Theme,
  ThemeBreakpoints,
  ThemeSpaces,
  ThemeAlignments,
} from "@types";

interface Style {
  $as?: AS;
  $options?: {
    additionalStyles?: (theme: Theme) => string;
  };
  $margin?:
    | ThemeBreakpoints<ThemeAlignments<ThemeSpaces>>
    | ThemeAlignments<ThemeSpaces>
    | ThemeSpaces;
}

const Heading = styled.h1<Style>`
  display: flex;
  align-items: center;

  ${({ $margin, theme }) =>
    /* Enable automatic deep margin */
    $margin &&
    getStyle<
      | ThemeBreakpoints<ThemeAlignments<ThemeSpaces>>
      | ThemeAlignments<ThemeSpaces>
      | ThemeSpaces
    >({
      style: $margin,
      theme,
      callback: (value) => {
        if (typeof value === "object") {
          return Object.entries(value).reduce(
            (previous, [key, val]) =>
              previous +
              `margin-${key}: ${
                val === "auto"
                  ? theme.spaces[val as ThemeSpaces]
                  : `${theme.spaces[val as ThemeSpaces]}rem`
              };`,
            ``
          );
        }

        return `margin: ${theme.spaces[value]}rem;`;
      },
    })}

  ${({ $as, theme: { breakpoints } }) => {
    switch ($as) {
      case "h1":
        return `
          font-size: 36px;
          line-height: 46px;
          @media (max-width: ${breakpoints.md}px) {
            font-size: 28px;
            line-height: 38px;
          }
        `;
      case "h2":
        return `
          font-size: 32px;
          line-height: 42px;
          @media (max-width: ${breakpoints.md}px) {
            font-size: 26px;
            line-height: 36px;
          }
        `;
      case "h3":
        return `
          font-size: 28px;
          line-height: 38px;
          @media (max-width: ${breakpoints.md}px) {
            font-size: 24px;
            line-height: 34px;
          }
        `;
      case "h4":
        return `
          font-size: 24px;
          line-height: 34px;
          @media (max-width: ${breakpoints.md}px) {
            font-size: 22px;
            line-height: 32px;
          }
        `;
      case "h5":
        return `
          font-size: 20px;
          line-height: 30px;
          @media (max-width: ${breakpoints.md}px) {
            font-size: 18px;
            line-height: 28px;
          }
        `;
      case "h6":
        return `
          font-size: 18px;
          line-height: 28px;
          @media (max-width: ${breakpoints.md}px) {
            font-size: 16px;
            line-height: 26px;
          }
        `;
      case "p":
        return ``;
    }
  }};
  ${({ $options, theme }) =>
    $options?.additionalStyles && $options?.additionalStyles(theme as Theme)};
`;

interface Heading extends Style {
  children?: React.ReactNode;
  $icon?: JSX.Element;
  onClick?: Function;
}

const index: FC<Heading> = ({
  children,
  onClick,
  $margin,
  $icon,
  $as,
  $options,
}) => {
  return (
    <Heading
      {...{ $as, $margin, $options }}
      onClick={() => onClick && onClick()}
    >
      {$icon && <Divider $margin={{ right: 1 }}>{$icon}</Divider>} {children}
    </Heading>
  );
};

export { index as Heading };
