// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Global components
import { Divider } from "@components";

// Local components
import { Product } from "./Product";

// Global types
import type { IProduct as ProductType } from "@types";

const Grid = styled(Divider)`
  z-index: 7;
`;

interface Grid {
  products: ProductType[];
}

const index: FC<Grid> = ({ products }) => {
  return (
    <Grid
      $padding={{
        xs: { top: 3, bottom: 3, left: 2, right: 2 },
        sm: { top: 5, bottom: 5, left: 2, right: 2 },
        xxl: { left: 0, right: 0 },
      }}
      $options={{
        flex: 1,
        additionalStyles: () => `
          flex-wrap: wrap;
        `,
      }}
    >
      {/* Show all products */}
      {Array.isArray(products) &&
        products.map((el, index) => (
          <Product index={index} key={el._id?.toString()} {...el} />
        ))}
    </Grid>
  );
};

export { index as Grid };
