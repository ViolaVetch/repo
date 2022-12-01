// Vendors
import styled, { css } from "styled-components";

export const Field = styled.input`
  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    z-index: 10;
    border: 1px solid ${colors.border};
  `}
`;
