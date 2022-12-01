// Core types
import { FC } from "react";

// Core
import { createContext, useRef, useState, useEffect } from "react";

// God knows
import { Placeholder } from "@components";

// Vendors
import styled, { css } from "styled-components";

// Core
import { useRouter } from "next/router";

// Global components
import { Divider, Heading } from "@components";

// Global types
import type { IProduct, IVariant, User } from "@types";

// Local components
import { Buttons } from "./Buttons";
import { Stock } from "./Stock";
import { InfoIcon, UserIcon } from "@icons";
import { formatCurrency } from "@utils/shared";

// Create Context base
export interface IGridProductContext {
  product: IProduct;
  currentVariant?: IVariant;
}
export const GridProductContext = createContext({} as IGridProductContext);

const Product = styled(Divider)`
  overflow: visible;
  cursor: pointer;

  ${({ theme: { spaces, breakpoints } }) => css`
    margin-bottom: ${spaces[3]}rem;

    @media (min-width: ${breakpoints.lg}px) {
      flex: 0 0 calc(33.33333% - ${spaces[3]}rem);
      margin-right: ${spaces[3]}rem;
    }

    @media (max-width: ${breakpoints.lg}px) {
      flex: 0 0 calc(50% - ${spaces[3]}rem);
      margin-right: ${spaces[3]}rem;
    }

    @media (max-width: ${breakpoints.sm}px) {
      flex: 0 0 100%;
    }
  `}
`;

const Price = styled.div`
  font-size: 18px;
  line-height: 28px;

  ${({ theme: { defaults, colors, font, ...theme } }) => css``}
`;

interface Props extends IProduct {
  index: number;
}

const index: FC<Props> = ({ index, ...product }) => {
  const { push } = useRouter();

  const [currentVariant, setCurrentVariant] = useState<IVariant>();

  useEffect(() => {
    const [variant] = product.variants;

    if (!currentVariant) setCurrentVariant(variant);
  }, [, product]);

  // Store product owner
  const owner: User | undefined = product?.owner as User;

  // Manage sellers HTML El
  const sellerRef = useRef<HTMLDivElement>(null);

  // Buttons useRef
  const button = useRef<HTMLDivElement>(null);

  return (
    <GridProductContext.Provider value={{ product, currentVariant }}>
      <Product
        onClick={(e) => {
          const el = button?.current;
          const seller = sellerRef?.current;

          if (
            e.target !== el &&
            !el?.contains(e.target as HTMLDivElement) &&
            !seller?.contains(e.target as HTMLDivElement)
          ) {
            push(`/product/${product.path}`);
          }
        }}
        $background={{ color: "white" }}
        $options={{
          additionalStyles: ({ spaces, colors, defaults }) => `
            border: 1px solid ${colors.border};
            border-radius: ${defaults.radius * 2}px;
            padding: ${spaces[1]}rem;
            z-index: ${100 - index};
          `,
        }}
        $direction="column"
      >
        {/* Thumbnail and stock visibility */}
        {product.thumbnail !== null ? (
          <Divider>
            {/* Seller */}
            {owner && owner.store && (
              <Divider
                ref={sellerRef}
                onClick={() => {
                  // Send user to a 404 page
                  push(`/?sellers=${owner.slug}`);
                }}
                $alignItems="center"
                $options={{
                  additionalStyles: ({ spaces, colors }) => `
                    cursor: pointer;
                    padding: ${spaces[1]}rem;
                    background-color: ${colors["primary"]}BB;
                    color: ${colors["white"]};
                    transition: 200ms ease-in-out;
                    width: fit-content;
                    block-size: fit-content;
                    border-radius: 30px;
                    position: absolute;
                    z-index: 10;
                    top: ${spaces[1]}rem;
                    left: ${spaces[1]}rem;

                    &:hover {
                      background: ${colors["primary"]}EE;
                    }


                    svg {
                      fill: ${colors["white"]};
                    }

                    &:active {
                      transform: scale(0.97);
                    }
                  `,
                }}
              >
                <UserIcon $size={24} />
                {owner.store}
              </Divider>
            )}

            <Divider
              $options={{
                additionalStyles: () => `
                  position: absolute;
                  bottom: 20px;
                  right: 20px;
                  z-index: 10;

                  svg {
                    opacity: 0.75;
                    transform: rotate(180deg);
                  }
                `,
              }}
            >
              <InfoIcon $size={22} $outline />
            </Divider>
            <Divider
              $options={{
                additionalStyles: ({ defaults, colors }) => `
                  border: 1px solid ${colors.border};
                  width: 100%;
                  min-height: 200px;
                  background-size: cover;
                  background-position: center;
                  background-image: url(${product.thumbnail});
                  border-radius: ${defaults.radius * 2}px;
                  overflow: hidden;
              `,
              }}
            />
          </Divider>
        ) : (
          <Divider
            $options={{
              additionalStyles: ({ colors }) => `
              border-bottom: 1px solid ${colors.border};
              width: 100%;
              min-height: 200px;
              background-size: cover;
              background-position: center;
              background-image: url(${product.thumbnail})
          `,
            }}
          >
            <Placeholder
              style={{
                height: "200px",
              }}
            />
          </Divider>
        )}

        {/* Product body */}
        <Divider $padding={2} $direction="column">
          <Heading $as="h4">
            {product.name} <Stock $codes={product.codes} $product={product} />
          </Heading>
        </Divider>

        {/* Product footer */}
        <Divider $padding={2} $alignItems="center" $margin={{ top: "auto" }}>
          {currentVariant && (
            <Divider $margin={{ left: "auto" }}>
              <Price>
                {formatCurrency({ amount: (currentVariant?.price).toString() })}
              </Price>
            </Divider>
          )}

          <Divider ref={button} $margin={{ left: 2 }}>
            {currentVariant !== undefined && (
              <Buttons {...{ product, currentVariant }} />
            )}
          </Divider>
        </Divider>
      </Product>
    </GridProductContext.Provider>
  );
};

export { index as Product };
