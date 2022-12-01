// Core
import { type FC, useState } from "react";

// Global components
import { Divider, Heading } from "@components";

// Global icons
import { CouponsIcon, ArrowDown, ArrowUp, UserIcon } from "@icons";

// Local components
import { Variant } from "./Variant";
import { IProductCart, IVariant, User } from "@types";

interface Product extends IProductCart {
  $status: string;
}

const index: FC<Product> = ({ $status, ...product }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const length = product.variants.reduce((p: number, n: any) => {
    if (p) return p + n.quantity;
    return n.quantity;
  }, 0);

  return (
    <Divider
      $direction="column"
      $options={{
        additionalStyles: ({ colors }) => `
          width: 100%;
          &:not(:last-of-type) {
            border-bottom: 1px solid ${colors["border"]}
          }
        `,
      }}
    >
      {/* Body */}
      <Divider
        $padding={{ top: 1, bottom: 1 }}
        $alignItems="flex-start"
        $direction="column"
        $options={{
          flex: 1,
        }}
      >
        <Divider
          $margin={{ bottom: 1 }}
          $options={{
            flex: 1,
            additionalStyles: () => `
              width: 100%;
              cursor: pointer;
            `,
          }}
        >
          <Divider
            onClick={() => {
              setIsVisible(!isVisible);
            }}
            $options={{
              additionalStyles: ({ spaces }) => `
                width: 100%;
                padding-right: ${spaces[1]}rem;
                display: flex;
                align-items: center;
                line-height: 28px;
              `,
            }}
          >
            <Divider $direction="column">
              <Divider $alignItems="center">
                <Heading $as="h4">{product.name}</Heading>

                {/* Seller */}
                {(product["owner"] as User).store && (
                  <Divider
                    $alignItems="center"
                    $options={{
                      additionalStyles: ({ spaces, colors }) => `
                        font-size: 12px;
                        padding-left: ${spaces[1]}rem;
                        padding-right: ${spaces[1]}rem;
                        margin-left: ${(spaces[1] as number) / 2}rem;
                        background: ${colors["primary"]}10;
                        color: ${colors["primary"]};
                        border-radius: 18px;
                      `,
                    }}
                  >
                    <UserIcon $size={17} />
                    {(product.owner as User).store}
                  </Divider>
                )}
              </Divider>

              <Divider
                $options={{
                  additionalStyles: ({ colors }) => `
                    color: ${colors["grey"]};
                    font-size: 14px;
                    line-height: 14px;
                  `,
                }}
              >
                <Divider
                  $options={{
                    additionalStyles: ({ spaces }) => `
                      margin-right: ${(spaces[1] as number) / 3}rem
                  `,
                  }}
                >
                  <CouponsIcon $size={20} $color="grey" />
                </Divider>
                {length} {length === 1 ? "product" : "products"}
              </Divider>
            </Divider>

            <Divider
              $margin={{ left: "auto" }}
              $options={{
                additionalStyles: ({ spaces }) => `
                font-size: 12px;
                margin-right: ${(spaces[1] as number) / 2}rem;
                `,
              }}
            >
              {isVisible
                ? "Collapse"
                : length === 1
                ? "View product"
                : "View products"}
            </Divider>
            <Divider
              $options={{
                additionalStyles: () => `font-size: 10px;`,
              }}
            >
              {isVisible ? (
                <ArrowUp $size={15} $color="secondary" />
              ) : (
                <ArrowDown $size={15} $color="secondary" />
              )}
            </Divider>
          </Divider>
        </Divider>

        {/* Variants and codes */}
        {isVisible && (
          <Divider
            $direction="column"
            $options={{
              additionalStyles: () => `
                width: 100%;
              `,
            }}
          >
            {product.variants.map((variant: IVariant) => (
              <Variant
                key={variant["_id"].toString()}
                {...variant}
                $status={$status}
              />
            ))}
          </Divider>
        )}
      </Divider>
    </Divider>
  );
};

export { index as Product };
