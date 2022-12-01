// Global components
import { Divider } from "@components/Divider";

// Global constants
import { AVAILABLECODES } from "@constants";

// Global types
import { ICode, IProduct } from "@types";

// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

const Indicator = styled.div<{
  $isActive: boolean;
}>`
  overflow: hidden;
  z-index: 10;
  width: 4px;
  height: 4px;
  border-radius: 50%;

  ${({ $isActive, theme: { colors, spaces } }) => css`
    margin-right: ${(spaces[1] as number) / 2}rem;
    margin-left: ${spaces[1]}rem;
    background-color: ${$isActive ? colors.success : colors.danger};
  `}
`;

interface Stock {
  $product: IProduct;
  [x: string]: any;
}

const index: FC<Stock> = ({ $codes, $product: product }) => {
  // Check product variants length
  const hasOnlyOneVariant = product.variants.length === 1;

  // Grab first variant
  const [firstVariant] = product.variants;

  // Check if there are codes in stock
  const inStock =
    $codes.filter((el: ICode) => AVAILABLECODES.includes(el["status"])).length >
    0;

  // Check if firstVariant is available
  const isFirstVariantAvailable = product.codes
    .filter((code) => code.variant.toString() == firstVariant._id.toString())
    .filter((code) => AVAILABLECODES.includes(code.status)).length;

  return (
    <Divider
      $alignItems="center"
      $options={{
        additionalStyles: () => `font-size: 14px;`,
      }}
    >
      <Indicator
        $isActive={
          hasOnlyOneVariant
            ? Boolean(isFirstVariantAvailable)
            : inStock
            ? true
            : false
        }
      />

      {hasOnlyOneVariant
        ? `${
            isFirstVariantAvailable === 0
              ? "Out of Stock"
              : `${isFirstVariantAvailable} in stock`
          }`
        : Array.isArray($codes) && inStock
        ? "In Stock"
        : "Out of Stock"}
    </Divider>
  );
};

export { index as Stock };
