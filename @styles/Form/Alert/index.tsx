// Vendors
import styled, { css } from "styled-components";

type Alert = {};

export const Alert = styled.label<Alert>`
  flex: 0 0 100%;
  cursor: pointer;

  ${({ theme: { defaults, font, colors } }) => css`
    font-weight: ${font["weight"]["medium"]};
    color: ${colors["border"]};
    margin-bottom: ${defaults.gutter / 4}px;
    margin-top: ${defaults.gutter / 4}px;
    background-color: ${colors.danger};
    color: ${colors.white};
    padding: ${defaults.gutter / 3}px;
  `}
`;
