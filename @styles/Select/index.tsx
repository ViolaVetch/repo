// Vendors
import styled, { css } from "styled-components";

export const Select = styled.select`
  ${({ theme: { defaults, colors, spaces, ...theme } }) => css`
    padding: ${(spaces[1] as number) / 1.5}rem;
    background-color: transparent;
    color: ${colors["white"]};
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: ${defaults.radius}px;
  `}
`;
