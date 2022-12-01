// Vendors
import styled, { css } from "styled-components";

export const Label = styled.label`
  ${({ theme: { spaces, ...theme } }) => css`
    margin-bottom: ${spaces[2]}rem;
  `}
`;
