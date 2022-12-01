// Vendors
import styled, { css } from "styled-components";

// Global types
import type { Icon as IconType } from "@types";

export const Icon = styled.svg<IconType>`
  ${({ $color, theme: { colors } }) =>
    $color
      ? css`
          fill: ${colors[$color]};
        `
      : css`
          fill: ${colors.primary};
        `}

  ${({ $size }) =>
    $size
      ? css`
          min-width: ${$size}px;
          width: ${$size}px;
        `
      : css`
          width: 25px;
        `}
`;

export const Path = styled.path`
  ${({ theme: { defaults, colors, font, ...theme } }) => css``}
`;

export const Rect = styled.rect`
  ${({ theme: { defaults, colors, font, ...theme } }) => css``}
`;

export const Circle = styled.circle`
  ${({ theme: { defaults, colors, font, ...theme } }) => css``}
`;
