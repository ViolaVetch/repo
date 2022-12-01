// Vendors
import styled, { css } from "styled-components";

// Global styles
import { Popover } from "@styles/Popover";

export const Errorgroup = styled.div<{ hasPassword?: boolean }>`
  position: absolute;
  display: flex;
  bottom: calc(50%);
  transform: translateY(50%);

  ${({ hasPassword }) => css`
    right: ${hasPassword ? "45px" : "15px"};
  `}

  &:hover ${Popover} {
    display: inline-block;
  }
`;
