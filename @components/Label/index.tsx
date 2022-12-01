// Core types
import type { FC, HTMLFactory } from "react";

// Vendors
import styled, { css } from "styled-components";

const Label = styled.label`
  ${({ theme: { defaults, colors, font, ...theme } }) => css``}
`;

interface Label {
  children?: React.ReactNode;
}

const index: FC<Label> = ({ children, ...props }) => {
  return <Label {...props}>{children}</Label>;
};

export { index as Label };
