// Core types
import type { FC } from "react";

// Global types
import { ICode, IVariant } from "@types";

// Global constants
import { AVAILABLECODES } from "@constants";

// Vendors
import styled, { css } from "styled-components";

const Stock = styled.div<{
  $isActive: boolean;
  $style?: "static" | "absolute";
}>`
  overflow: hidden;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:before {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    content: "";
    position: absolute;
    z-index: -1;
  }

  ${({ theme: { defaults, spaces } }) => css`
    border-radius: ${defaults.radius * 3}px;
    padding: ${(spaces[1] as number) * 1.5}rem ${(spaces[1] as number) * 3}rem;
  `}

  ${({ $style, theme: { spaces } }) => {
    switch ($style) {
      case "static":
        return css`
          align-self: flex-start;
          position: relative;
          margin-bottom: ${spaces[2]}rem;
        `;
      case "absolute":
        return css`
          position: absolute;
          right: ${spaces[2]}rem;
          top: ${spaces[2]}rem;
        `;
    }
  }}

  ${({ $isActive, theme: { colors } }) => css`
    color: ${$isActive ? colors.success : colors.danger};
    &:before {
      background-color: ${$isActive ? colors.success : colors.danger}50;
      opacity: 0.25;
    }
  `}
`;

interface Stock {
  $codes: ICode[];
  $style?: "static" | "absolute";
  $currentVariant?: IVariant;
}

const index: FC<Stock> = ({ $codes, $style, $currentVariant }) => {
  // Check if firstVariant is available
  const availableCodes = $codes
    .filter(
      (code) => code.variant.toString() == $currentVariant?._id.toString()
    )
    .filter((code) => AVAILABLECODES.includes(code.status));

  return (
    <Stock {...{ $style }} $isActive={availableCodes.length > 0 ? true : false}>
      {Array.isArray($codes) && availableCodes.length > 0
        ? `${availableCodes.length} in stock`
        : "Out of Stock"}
    </Stock>
  );
};

export { index as Stock };
