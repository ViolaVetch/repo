// Core types
import type { FC } from "react";

// Core
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Vendors
import { useDispatch } from "react-redux";
import axios from "axios";

// Local components
import { Stock } from "@containers/product/Stock";
import { Buttons } from "@containers/product/Buttons";

// Global components
import { Loader, Divider, Placeholder, Heading } from "@components";
import { Normal } from "@components/Layouts";

// Icons
import { CategoryIcon, UserIcon } from "@icons";
import type { IProduct, IVariant } from "@types";

// Local component
import type { IVariants } from "./Variants";

// Global site config
import SiteConfig from "configs/Site.config";

// GLobal @methods
import { getItems } from "@methods/getItems";

// Global icons
const Variants = dynamic<IVariants>(
  () => import("./Variants").then((mod) => mod.Variants),
  {
    ssr: false,
  }
);

const Product: FC = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  // Router
  const { push, query } = useRouter();

  // Grab slug from router query
  const { path } = query;

  useEffect(() => {
    (async () =>
      await axios({
        url: `${SiteConfig.API}/products`,
        method: "PUT",
        data: { view: true, path },
      }))();
  }, [,]);

  useEffect(() => {
    if (product === null)
      getItems<IProduct>({
        onSuccess: ({ data }) => {
          // Extract items and length
          const { items, length } = data;
          // Check if any data was found
          if (length) {
            // Handle product if found
            const [item] = items;
            // Set product
            setProduct(item);
            // Stop loader
            setLoading(false);
          } else {
            // Send user to a 404 page
            push("/404");
          }
        },
        setLoading,
        dispatch,
        model: "products",
        query: {
          path,
        },
      });

    if (product?.variants?.length > 0) {
      // Set first variant
      const [variant] = product.variants;
      if (!currentVariant) setCurrentVariant(variant);
    }
  }, [product]);

  const [currentVariant, setCurrentVariant] = useState<IVariant>();

  useEffect(() => {
    // Every time quantity changes
    setQuantity(1);
  }, [currentVariant]);

  return (
    <Normal title={loading || product === null ? "..." : product.name}>
      <Divider
        $padding={{
          xs: { top: 2, bottom: 2, left: 2, right: 2 },
          sm: { top: 5, bottom: 5 },
        }}
        $margin={{
          sm: { top: 5, bottom: 5 },
        }}
      >
        <Divider
          $extends="container"
          $background={{ color: "white" }}
          $options={{
            additionalStyles: ({ colors, defaults, spaces }) => `
              border-radius: ${defaults.radius * 2}px;
              border: 1px solid ${colors.border};            
              min-height: calc(600px - ${spaces[3]}rem)
            `,
          }}
        >
          {product === null || loading ? (
            <Loader />
          ) : (
            <Divider
              $options={{
                additionalStyles: () => `
                  width: 100%;
                `,
              }}
              $direction={{
                xs: "column-reverse",
                sm: "row",
              }}
            >
              {/* Content */}
              <Divider $options={{ flex: 1 }} $padding={3} $direction="column">
                <Divider>
                  {/* Category */}
                  {Array.isArray(product.categories) &&
                    product.categories.length > 0 && (
                      <Divider
                        $alignItems="center"
                        $options={{
                          additionalStyles: ({ spaces, colors }) => `
                            padding: ${spaces[1]}rem;
                            background: ${colors["primary"]}10;
                            color: ${colors["primary"]};
                            width: fit-content;
                            block-size: fit-content;
                            border-radius: 30px;
                            margin-right: ${spaces[1]}rem;
                          `,
                        }}
                      >
                        <Divider
                          $options={{
                            additionalStyles: ({ spaces }) =>
                              `margin-right: ${(spaces[1] as number) / 2}rem`,
                          }}
                        >
                          <CategoryIcon $size={24} />
                        </Divider>

                        {product.categories.map(
                          (
                            el: any, // To be updated
                            index: number
                          ) => (
                            <Divider
                              $options={{
                                additionalStyles: ({ spaces }) =>
                                  `text-transform: capitalize; margin-right: ${
                                    (spaces[1] as number) / 2
                                  }rem;`,
                              }}
                            >
                              {el.toString()}

                              {index + 1 !== product.categories.length &&
                              product.categories.length > 1
                                ? ", "
                                : ""}
                            </Divider>
                          )
                        )}
                      </Divider>
                    )}

                  {/* Seller */}
                  {product.owner.store && (
                    <Divider
                      $alignItems="center"
                      onClick={() => {
                        // Send user to a 404 page
                        push(`/?sellers=${product.owner.slug}`);
                      }}
                      $options={{
                        additionalStyles: ({ spaces, colors }) => `
                          cursor: pointer;
                          padding: ${spaces[1]}rem;
                          background: ${colors["primary"]}10;
                          color: ${colors["primary"]};
                          transition: 200ms ease-in-out;
                          width: fit-content;
                          block-size: fit-content;
                          border-radius: 30px;
                          &:hover {
                            background: ${colors["primary"]}30;
                          }
                          &:active {
                            transform: scale(0.97);
                          }
                        `,
                      }}
                    >
                      <UserIcon $size={24} />
                      {product.owner.store}
                    </Divider>
                  )}
                </Divider>

                <Heading $as="h1" $margin={{ top: 2, bottom: 2 }}>
                  {product.name}
                </Heading>

                <Heading
                  $margin={product.variants.length > 0 ? 0 : { bottom: 2 }}
                  $as="p"
                  $options={{
                    additionalStyles: () => `white-space: pre-line;`,
                  }}
                >
                  {product.description}
                </Heading>

                {product.variants.length > 0 && (
                  <Variants
                    {...{
                      quantity,
                      setQuantity,
                      currentVariant,
                      setCurrentVariant,
                    }}
                    {...product}
                  />
                )}

                <Stock
                  $style="static"
                  $codes={product.codes}
                  $currentVariant={currentVariant}
                />

                <Divider $margin={{ right: "auto" }}>
                  <Buttons {...{ product, quantity, currentVariant }} />
                </Divider>
              </Divider>

              {/* Thumbnail and stock visibility */}
              <Divider
                $padding={3}
                $options={{
                  flex: 1,
                  additionalStyles: () => `
                `,
                }}
              >
                {product.thumbnail !== null ? (
                  <Divider
                    $options={{
                      additionalStyles: ({ defaults, colors }) => `
                        border: 1px solid ${colors.border};
                        border-radius: ${defaults.radius * 2}px;
                        min-height: 200px;
                        width: 100%;
                        background-size: cover;
                        background-position: center;
                        background-image: url(${product.thumbnail})
                      `,
                    }}
                  ></Divider>
                ) : (
                  <Divider
                    $options={{
                      flex: 1,
                      additionalStyles: ({ defaults, colors }) => `
                        border: 1px solid ${colors.border};
                        border-radius: ${defaults.radius * 2}px;
                        width: 100%;
                        min-height: 200px;
                        background-color: #f4f4f4;
                        overflow: hidden;
                      `,
                    }}
                  >
                    <Placeholder
                      style={{
                        height: "100%",
                      }}
                    />
                  </Divider>
                )}
              </Divider>
            </Divider>
          )}
        </Divider>
      </Divider>
    </Normal>
  );
};

export { Product };
