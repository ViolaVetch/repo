// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

const Paragraph = styled.div`
  ${({ theme: { defaults, colors, font } }) => css``}
`;

interface Paragraph {
  children?: React.ReactNode;
  onClick?: any;
}

const index: FC<Paragraph> = ({ children, ...props }) => {
  return <Paragraph {...props}>{children}</Paragraph>;
};

export { index as Paragraph };
