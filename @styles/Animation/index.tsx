import { Theme } from "@types";
import styled, { keyframes, css } from "styled-components";

// Create the keyframes
const animate = keyframes`
    0%{
        background-position: -600px 0
    }
    100%{
        background-position: 600px 0
    }
`;

export const Animation = styled.div<{ $style?: (theme: Theme) => string }>`
  background: linear-gradient(to right, #f5f7f9 8%, #eaeef2 18%, #f5f7f9 33%);
  background-size: 1200px 104px;
  position: relative;
  animation-timing-function: linear;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;

  ${({ theme: { defaults } }) => css`
    border-radius: ${defaults["radius"]}px;
    animation-name: ${animate};
  `}

  ${({ $style, theme }) => $style && $style(theme as Theme)};
`;
