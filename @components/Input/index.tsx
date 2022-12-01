// Vendors
import styled, { css } from "styled-components";

const Component = styled.input`
  width: 100%;
  font-size: 1.05em;
  padding: 0.6em;
  border: 0;
  background: transparent;
  transition: 200ms all ease-in-out;
  border: 1px solid #eaeef2;

  ${({ theme: { colors, defaults } }) => css`
    border-radius: ${defaults.radius}px;
    
    &:focus {
      border: 1px solid ${colors.primary};
    }
  `}
`;

export const Input = ({ ...props }) => {
  return <Component {...props} />;
};
