// Core
import { type FC, useMemo, useState } from "react";

// Vendors
import { useSession } from "next-auth/react";

// Global components
import { Divider, Heading } from "@components";
import { ArrowDown, CouponsIcon, UserIcon } from "@icons";

// Local componeonts
import { Variants } from "./Variants";

// Global types
import { IOrderProduct, User } from "@types";

interface IProduct extends IOrderProduct {
  count: number;
  index: number;
}

export const Product: FC<IProduct> = ({ count, index, ...product }) => {
  const { data: session } = useSession();

  // Handle product dropdown visibility
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const isVisibleMemo = useMemo(() => isVisible, [isVisible]);

  return (
    <Divider
      key={product["_id"].toString()}
      $color="secondary"
      $direction="column"
      $options={{
        additionalStyles: ({ defaults, colors, spaces }) => `
          width: 100%;
          border-radius: ${defaults["radius"] * 2}px;
          border: 1px solid ${colors["border"]};
          &:not(:last-of-type) {
            margin-bottom: ${spaces[2]}rem;
          }
        `,
      }}
    >
      {/* Header */}
      <Divider
        $alignItems="center"
        $padding={2}
        onClick={() => setIsVisible(!isVisibleMemo)}
        $options={{
          additionalStyles: ({ name, colors }) => `
            width: 100%;
            cursor: pointer;
            ${
              isVisibleMemo &&
              `
                border-bottom: 1px solid ${colors["border"]};
            `
            } 

            &:hover {
              background-color: ${
                name === "light" ? "rgb(0,0,0,0.015)" : "rgb(255,255,255,0.15)"
              };
            }
          `,
        }}
      >
        <CouponsIcon $size={30} $color="primary" />
        <Heading $margin={{ left: 1 }} $as="h5">
          {product["name"]}
          {/* Seller */}
          {session?.user.role === "admin" && (product["owner"] as User).store && (
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
              {(product["owner"] as User).store}
            </Divider>
          )}
        </Heading>

        <Divider $alignItems="center" $margin={{ left: "auto" }}>
          <Divider $alignItems="center" $margin={{ right: 2 }}>
            <Divider
              $padding={1}
              $alignItems="center"
              $justifyContent="center"
              $options={{
                additionalStyles: ({ colors }) => `
                  border-radius: 50px; 
                  width: 25px;
                  height: 25px;
                  font-size: 13px;
                  background-color: ${colors["border"]};
                `,
              }}
            >
              {count}
            </Divider>
            <Divider $margin={{ left: 1 }}>products</Divider>
          </Divider>
          <ArrowDown $size={15} $color="grey" />
        </Divider>
      </Divider>

      {/* Body */}
      {isVisibleMemo && (
        <Divider $padding={2} $direction="column">
          <Heading $as="p" $margin={{ bottom: 1 }}>
            Variants:
          </Heading>

          <Variants {...{ variants: product.variants, index }} />
        </Divider>
      )}
    </Divider>
  );
};
