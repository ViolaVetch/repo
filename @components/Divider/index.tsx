// Vendors
import styled, { css } from "styled-components";

// Global types
import type {
  ThemeBreakpoints,
  ThemeSpaces,
  ThemeAlignments,
  ThemeColors,
  ThemeVariants,
  ThemeDirections,
  ThemeFlexAlignments,
  Theme,
  ThemeTextAlignments,
  ThemeFlexJustifyContent,
} from "@types";

// Global utilities, @client-only
import { getStyle } from "@utils/client/styles";

interface DividerType {
  $justifyContent?:
    | ThemeBreakpoints<ThemeFlexJustifyContent>
    | ThemeFlexJustifyContent;
  $alignItems?: ThemeBreakpoints<ThemeFlexAlignments> | ThemeFlexAlignments;
  $textAlign?: ThemeBreakpoints<ThemeTextAlignments> | ThemeTextAlignments;
  $direction?: ThemeBreakpoints<ThemeDirections> | ThemeDirections;
  $padding?:
    | ThemeBreakpoints<ThemeAlignments<ThemeSpaces>>
    | ThemeAlignments<ThemeSpaces>
    | ThemeSpaces;
  $margin?:
    | ThemeBreakpoints<ThemeAlignments<ThemeSpaces>>
    | ThemeAlignments<ThemeSpaces>
    | ThemeSpaces;
  $background?: {
    isCustom?: boolean;
    color: ThemeColors;
  };
  $color?: ThemeColors;
  $options?: {
    additionalStyles?: (theme: Theme) => string;
    clickable?: boolean;
    flex?: number;
    zIndex?: number;
  };
  $variants?: ThemeVariants;
  $extends?: "button" | "container" | "card" | "default";
  children?: React.ReactNode;
}

const index = styled.div<DividerType>`
  display: flex;
  position: relative;

  ${({ $extends, theme: { colors, defaults, spaces, breakpoints } }) => {
    switch ($extends) {
      case "button":
        return css`
          cursor: pointer;
          &:active {
            transform: scale(0.95) translateY(2px);
          }
        `;
      case "container":
        return css`
          width: 1300px;
          max-width: 100%;
          margin-left: auto;
          margin-right: auto;
        `;
      case "card":
        return css`
          padding: ${spaces[4]}rem;
          border-radius: ${defaults.radius * 2}px;
          background-color: ${colors.white};
          border: 1px solid ${colors.border};

          @media (max-width: ${breakpoints["lg"]}px) {
            padding: ${spaces[2]}rem;
          }
        `;
      default:
        return css``;
    }
  }}

  ${({ $options }) =>
    $options?.clickable &&
    css`
      cursor: pointer;
    `}
  
  
  ${({ $options, theme }) =>
    $options?.additionalStyles && $options?.additionalStyles(theme as Theme)};

  ${({ $options }) =>
    typeof $options?.zIndex === "number" &&
    css`
      z-index: ${$options.zIndex};
    `}

  ${({ $options }) =>
    $options?.flex &&
    css`
      flex: ${$options.flex};
    `}

  ${({ $color, theme: { colors } }) =>
    $color &&
    css`
      color: ${colors[$color]};
    `}

  ${({ $background, theme: { colors } }) => css`
    background-color: ${$background?.isCustom
      ? $background.color
      : colors[$background?.color as ThemeColors]};
  `}

  ${({ $variants, theme: { colors, name } }) => {
    switch ($variants) {
      case "light":
        return css`
          background-color: rgba(255, 255, 255, 0.05);
          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
        `;
      case "grey":
        switch (name) {
          case "dark":
            return css`
              background-color: #444444;
              &:hover {
                background-color: rgba(255, 255, 255, 0.1);
              }
            `;
          case "light":
            return css``;
        }
      default:
        return css``;
    }
  }}





  ${({ $justifyContent, theme }) =>
    $justifyContent &&
    getStyle<
      ThemeBreakpoints<ThemeFlexJustifyContent> | ThemeFlexJustifyContent
    >({
      style: $justifyContent,
      theme,
      callback: (value) => `justify-content: ${value};`,
    })}

  ${({ $alignItems, theme }) =>
    $alignItems &&
    getStyle<ThemeBreakpoints<ThemeFlexAlignments> | ThemeFlexAlignments>({
      style: $alignItems,
      theme,
      callback: (value) => `align-items: ${value};`,
    })}

  ${({ $textAlign, theme }) =>
    $textAlign &&
    getStyle<ThemeBreakpoints<ThemeTextAlignments> | ThemeTextAlignments>({
      style: $textAlign,
      theme,
      callback: (value) => `text-align: ${value};`,
    })}


  ${({ $direction, theme }) => {
    return $direction
      ? getStyle({
          style: $direction,
          theme,
          callback: (value) => `flex-direction: ${value};`,
        })
      : css`
          flex-direction: row;
        `;
  }}


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


  ${({ $padding, theme }) =>
    /* Enable automatic deep padding */
    $padding &&
    getStyle<
      | ThemeBreakpoints<ThemeAlignments<ThemeSpaces>>
      | ThemeAlignments<ThemeSpaces>
      | ThemeSpaces
    >({
      style: $padding,
      theme,
      callback: (value) => {
        if (typeof value === "object") {
          return Object.entries(value).reduce(
            (previous, [key, val]) =>
              previous +
              `padding-${key}: ${theme.spaces[val as ThemeSpaces]}rem;`,
            ``
          );
        }

        return `padding: ${theme.spaces[value]}rem;`;
      },
    })}
`;

export { index as Divider };
