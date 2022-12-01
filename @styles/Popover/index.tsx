// Vendors
import styled, { css } from "styled-components";

// Global types
import type { Theme } from "@types";

interface IPopover {
  $style?: (theme: Theme) => string;
}

export const Popover = styled.div<IPopover>`
  z-index: 2;
  user-select: none;
  transition: transform 150ms ease-in-out;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  font-size: 12px;
  text-align: center;
  bottom: 100%;
  min-width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  user-select: none;

  &:after {
    width: 0;
    height: 0;
    right: calc(50% - 10px);
    bottom: -10px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    content: "";
    position: absolute;
  }

  ${({ theme: { defaults, spaces, colors } }) => css`
    border-radius: ${defaults["radius"]}px;
    color: ${colors["secondary"]};
    background-color: ${colors["white"]};
    padding: ${(spaces[2] as number) / 1.5}rem;

    &:after {
      border-top: 10px solid ${colors["white"]};
    }
  `}

  ${({ $style, theme }) => $style && $style(theme as Theme)};
`;
