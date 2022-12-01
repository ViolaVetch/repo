// Core
import { type FC, useEffect, useState } from "react";

// Vendors
import { FieldArray, useFormikContext } from "formik";

// Global components
import { Divider, Heading } from "@components";

// Local componeonts
import { Product } from "./Product";
import { Replacement } from "./Replacement";

// Import order initialValues
import type { IOrderFields } from "@containers/account/Orders/Order";
import { IOrderProduct, IOrderVariant } from "@types";

const index: FC = () => {
  const { values } = useFormikContext<IOrderFields>();

  // Count how many products are inside the order
  const [productsCount, setProductsCount] = useState<number>(0);

  // Reduce each products variants quantity to a final count
  const reduceVariants = (variants: IOrderVariant[]) =>
    variants.reduce((prev, next) => prev + next["quantity"], 0);

  // Trigger a products count on initial render
  useEffect(
    () =>
      setProductsCount(
        values["products"].reduce(
          (prev, next: IOrderProduct) =>
            prev + reduceVariants(next["variants"]),
          0
        )
      ),
    []
  );

  return (
    <Divider $direction="column">
      <Divider
        $margin={{ top: 2 }}
        $direction="column"
        $options={{
          additionalStyles: () => `
            width: 100%;
          `,
        }}
      >
        {/* Header */}
        <Divider
          $direction="column"
          $padding={{ top: 3, bottom: 3 }}
          $options={{
            additionalStyles: ({ colors }) =>
              `border-top: 1px solid ${colors["border"]}`,
          }}
        >
          <Heading $as="h3">Products</Heading>
          <Heading
            $as="p"
            $options={{
              additionalStyles: ({ colors }) => `
                color: ${colors["grey"]};
                font-size: 12px;
              `,
            }}
          >
            {productsCount} products in total.
          </Heading>
        </Divider>

        <FieldArray
          name="products"
          render={() =>
            values["products"].map((product: IOrderProduct, index: number) => {
              // Count quantities of each variant on this product
              const count = reduceVariants(product["variants"]);

              return (
                <Product
                  key={product["_id"].toString()}
                  index={index}
                  count={count}
                  {...product}
                />
              );
            })
          }
        />

        <Replacement />
      </Divider>
    </Divider>
  );
};

export { index as Products };
