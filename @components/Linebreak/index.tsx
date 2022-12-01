// Vendors
import styled, { css } from "styled-components";

const Component = styled.div`
  width: 100%;
  height: 1px;
  background: #eaeef2;
  border-radius: 999px;
`;

export const Linebreak = ({ ...props }) => {
  return <Component {...props} />;
};
