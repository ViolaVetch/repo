// Core
import { Fragment, useState, useContext } from "react";

// Core types
import type { FC } from "react";

// Vendors
import { useDispatch, useSelector } from "react-redux";

// Global Icons
import { ArrowDown, CartIcon, RoundedRemoveIcon } from "@icons";

// Global constants
import { AVAILABLECODES } from "@constants";

// Global types
import type { IProductCart, Store } from "@types";

// Global components
import { Divider, Button } from "@components";

// Cart store context
import { addToCart, removeFromCart } from "redux/cartSlice";

// Local components
import { Popup } from "./Popup";

// Local context
import { GridProductContext } from "..";

interface Buttons {}

const index: FC<Buttons> = () => {
  const cart = useSelector((state: Store) => state.cart.itemsInCart);
  const dispatch = useDispatch();

  // Local context
  const { product } = useContext(GridProductContext);

  const handleAddToCart = ({ product, variant }: any) => {
    dispatch(
      addToCart({
        product,
        quantity: variant["min"],
        variant,
      })
    );
  };

  // Manage product visibility
  const [isVisible, setIsVisible] = useState(false);

  // Manage button functionality
  const ButtonFC = () => {
    // Check product variants length
    const hasOnlyOneVariant = product.variants.length === 1;

    // Grab first variant
    const [firstVariant] = product.variants;

    // Check if firstVariant is available
    const areProductsInStock = product.codes.filter((code) =>
      AVAILABLECODES.includes(code["status"])
    ).length;

    // Check if firstVariant is available
    const isFirstVariantAvailable = product.codes.filter(
      (code) => code.variant.toString() == firstVariant._id.toString()
    ).length;

    // Check if this variant is in cart
    const isFirstVariantInCart = cart.some(
      (item: IProductCart) => item.currentVariant?._id == firstVariant._id
    );

    return (
      <Fragment>
        <Button
          type="button"
          $variant="primary"
          $isDisabled={!Boolean(areProductsInStock)}
          onClick={() => {
            if (areProductsInStock) {
              // Check if we have only 1 variant or more
              if (hasOnlyOneVariant) {
                // Check if the only variant is on cart
                if (isFirstVariantInCart) {
                  // Remove from the cart
                  dispatch(removeFromCart({ variant: firstVariant }));
                } else {
                  // Add to cart the only variant here
                  if (isFirstVariantAvailable)
                    handleAddToCart({
                      product,
                      variant: firstVariant,
                    });
                }
              } else setIsVisible(!isVisible);
            }
          }}
          $style={
            hasOnlyOneVariant && isFirstVariantInCart ? "outline" : "solid"
          }
        >
          {hasOnlyOneVariant && isFirstVariantInCart ? (
            <RoundedRemoveIcon $size={30} $color="primary" />
          ) : (
            <CartIcon $color="white" $size={30} />
          )}

          {hasOnlyOneVariant && isFirstVariantInCart ? (
            <Divider $margin={{ left: 1 }}>Remove from cart</Divider>
          ) : (
            <Divider $margin={{ left: 1 }}>
              Add to cart
              {!hasOnlyOneVariant && (
                <Divider
                  $options={{
                    additionalStyles: ({ spaces }) =>
                      `margin-left: ${(spaces[1] as number) / 2}rem;`,
                  }}
                >
                  <ArrowDown $size={10} $color="white" />
                </Divider>
              )}
            </Divider>
          )}
        </Button>
      </Fragment>
    );
  };

  return (
    <Divider
      $direction="column"
      $options={{
        additionalStyles: () => `
          z-index: 10;
          // min-width: 200px;
        `,
      }}
    >
      <ButtonFC />

      {isVisible && <Popup $close={() => setIsVisible(false)} />}
    </Divider>
  );
};

export { index as Buttons };
