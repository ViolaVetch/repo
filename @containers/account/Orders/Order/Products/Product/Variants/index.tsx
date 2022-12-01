// Core
import { Fragment, useState } from "react";

// Core types
import type { FC } from "react";

// Vendors
import { FieldArray } from "formik";

// Global components
import { Divider } from "@components";
import { ArrowDown } from "@icons";

// Local components
import { Code } from "./Code";

const Variant: FC<any> = ({ productIndex, variantIndex, ...variant }) => {
  const [IsVisible, setIsVisible] = useState<boolean>(false);

  return (
    <Divider $direction="column" $margin={{ bottom: 1 }}>
      {/* Header */}
      <Divider
        $padding={2}
        onClick={() => setIsVisible(!IsVisible)}
        $options={{
          additionalStyles: ({ defaults, font }) => `
            border-top-left-radius: ${defaults["radius"] * 2}px;
            border-top-right-radius: ${defaults["radius"] * 2}px;
            background-color: #eaeef2;
            cursor: pointer;
            font-weight: ${font["weight"]["semiBold"]};


            ${
              !IsVisible &&
              `
                border-bottom-left-radius: ${defaults["radius"] * 2}px;
                border-bottom-right-radius: ${defaults["radius"] * 2}px;
            `
            }
        `,
        }}
      >
        {variant.name}
        <Divider $margin={{ left: "auto" }}>
          <Divider
            $color="grey"
            $margin={{ right: 2 }}
            $options={{
              additionalStyles: ({ colors }) => `
            font-size: 12px;
          `,
            }}
          >
            {variant.quantity === 1
              ? `1 coupon`
              : `${variant.quantity} coupons`}
          </Divider>

          <ArrowDown $size={12} $color="grey" />
        </Divider>
      </Divider>

      {/* Body */}
      {IsVisible && (
        <Divider $direction="column">
          <FieldArray
            name={`products.${productIndex}.variants.${variantIndex}.codes`}
            render={(arrayHelpers) => (
              <Fragment>
                {variant.codes.map((code: any, codeIndex: number) => {
                  return (
                    <Code
                      key={code._id}
                      {...code}
                      {...{ productIndex, variantIndex, codeIndex }}
                    />
                  );
                })}
              </Fragment>
            )}
          />
        </Divider>
      )}
    </Divider>
  );
};

const index: FC<any> = ({ variants, index: productIndex }) => {
  return (
    <Divider $direction="column">
      <FieldArray
        name={`products.${productIndex}.variants`}
        render={(arrayHelpers) =>
          variants.map((variant: any, variantIndex: number) => {
            return (
              <Variant
                key={variant._id}
                {...{ productIndex, variantIndex }}
                {...variant}
              />
            );
          })
        }
      />
    </Divider>
  );
};

export { index as Variants };
