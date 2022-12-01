// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// God knows
import { Button } from "@components";

// Icons
import { CartIcon, RoundedRemoveIcon } from "@icons";

// Local store management
import { addToCart, removeFromCart } from "redux/cartSlice";

// Global types
import { ICode, IVariant, Store, IProduct } from "@types";

// Global components
import { Divider } from "@components";

// Global constants
import { AVAILABLECODES } from "@constants";

interface CartProduct extends IProduct {
  currentVariant?: IVariant;
}

interface Buttons {
  product: CartProduct;
  quantity?: number;
  currentVariant?: IVariant;
}

const index: FC<Buttons> = ({ currentVariant, product, quantity }) => {
  const cart = useSelector((state: Store) => state.cart.itemsInCart);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity: quantity ? quantity : 1,
        variant: currentVariant,
      })
    );
  };

  const handleRemoveFromCart = () =>
    dispatch(removeFromCart({ variant: currentVariant }));

  const isProductInCart =
    cart.some(
      (item: CartProduct) => item.currentVariant?._id === currentVariant?._id
    ) === false;

  // To be converted into a custom fn
  const availableCodes = product.codes.filter((el: ICode) => {
    return (
      el.variant == currentVariant?._id && AVAILABLECODES.includes(el.status)
    );
  });

  return !isProductInCart ? (
    <Button
      onClick={() => handleRemoveFromCart()}
      $variant="primary"
      $style="outline"
    >
      <RoundedRemoveIcon $size={24} />
      <Divider $margin={{ left: 1 }} $color="primary">
        Remove from cart
      </Divider>
    </Button>
  ) : (
    <Button
      $isDisabled={Array.isArray(availableCodes) && availableCodes.length <= 0}
      $variant="primary"
      onClick={() => {
        // Check if product has codes, if not, don't allow to be added on cart
        if (Array.isArray(availableCodes) && availableCodes.length > 0)
          handleAddToCart();
      }}
    >
      <CartIcon $color="white" $size={24} />
      Add to cart
    </Button>
  );
};

export { index as Buttons };
