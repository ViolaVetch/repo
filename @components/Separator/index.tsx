// Vendors
import styled, { css } from "styled-components";

// Global utilities, @client-only
import { getStyle } from "@utils/client/styles";

// Global types
import type {
  ThemeBreakpoints,
  ThemeAlignments,
  ThemeSpaces,
  Theme,
} from "@types";

type TAxis = "x" | "y";

export const Separator = styled.div<Separator>`
  background: #eaeef2;

  ${({ $axis = "y", $height = 20, $margin, theme }) =>
    getStyle({
      style: $axis,
      theme,
      callback: (value) => {
        switch (value) {
          case "x":
            return `
                    width: 100%;
                    height: 1px;
                    border-bottom: 1px solid ${theme["colors"]["border"]};
                    margin-top: ${theme["spaces"][$margin ? $margin : 3]}rem;
                    margin-bottom: ${theme["spaces"][$margin ? $margin : 3]}rem;
                  `;
          default:
            return `
                    width: 1px;
                    height: ${$height}px;
                    border-right-width: 1px;
                    border-right-style: solid;
                    border-color: ${theme["colors"]["border"]};
                    margin-right: ${theme["spaces"][$margin ? $margin : 3]}rem;
                    margin-left: ${theme["spaces"][$margin ? $margin : 3]}rem;
                  `;
        }
      },
    })}

  ${({ $style, theme }) => $style && $style(theme as Theme)};
`;

interface Separator {
  $margin?: ThemeSpaces;
  $height?: number;
  $style?: (theme: Theme) => string;
  $axis?: ThemeBreakpoints<TAxis> | TAxis;
}
