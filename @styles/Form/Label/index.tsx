// Vendors
import styled, { css } from "styled-components";

type Label = {};

export const Label = styled.label<Label>`
  // flex: 0 0 100%;
  cursor: pointer;
  pointer-events: none;

  ${({ theme: { defaults, colors } }) => css`
    color: ${colors["secondary"]};
    margin-bottom: ${defaults.gutter / 4}px;
  `}
`;
