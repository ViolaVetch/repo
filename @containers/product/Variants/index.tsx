// Core
import { Fragment, useEffect } from "react";

// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Global components
import { Divider, Label, Heading } from "@components";

// Global types
import type { ICode, IVariant, Store } from "@types";

// Vendors
import { useDispatch, useSelector } from "react-redux";

// Global APIs
import { addToCart } from "redux/cartSlice";
import { formatCurrency } from "@utils/shared";
import { AVAILABLECODES } from "@constants";

const Input = styled.input`
  ${({ theme: { defaults, colors, spaces } }) => css`
    padding: ${(spaces[2] as number) / 1.5}rem;
    border-radius: ${defaults["radius"]}px;
    border: 1px solid ${colors["border"]};
  `}
`;

export interface IVariants {
  quantity: number;
  setQuantity: Function;
  variants: IVariant[];
  currentVariant?: IVariant;
  setCurrentVariant: Function;
  [x: string]: any;
}

const index: FC<IVariants> = ({
  currentVariant,
  setCurrentVariant,
  quantity,
  setQuantity,
  ...product
}) => {
  const dispatch = useDispatch();

  const { variants, codes } = product;

  const cart = useSelector((state: Store): any => state.cart);

  const exists = cart.itemsInCart.find(
    (item: any): any => item.currentVariant._id === currentVariant?._id
  );

  useEffect(() => {
    if (variants) {
      // Grab the first variant
      const [variant] = variants;
      if (!currentVariant) setCurrentVariant(variant);
    }
  }, [cart]);

  useEffect(() => {}, [exists]);

  // To be converted into a custom fn
  const availableCodes = codes.filter((el: ICode) => {
    return (
      el.variant == currentVariant?._id && AVAILABLECODES.includes(el["status"])
    );
  });

  // Check current variant length
  const length = product.variants.length;

  return (
    <Divider $direction="column" $padding={{ top: 2, bottom: 2 }}>
      {length > 1 && (
        <Divider $direction="column" $margin={{ top: 1 }}>
          <Label>Select variant:</Label>
          <Input
            as="select"
            onChange={(e: any) => {
              // Extract selected variant from _id
              const [variant] = variants.filter(
                (el) => el._id.toString() == e.currentTarget.value
              );

              // Set variant
              setCurrentVariant(variant);
            }}
          >
            {variants?.map(({ _id, name }) => (
              <option key={_id.toString()} value={_id.toString()}>
                {name}
              </option>
            ))}
          </Input>
        </Divider>
      )}

      {/* Check if item exists on cart, if yes, just update the quantity */}
      {exists ? (
        <Divider $direction="column" $margin={{ top: 1, bottom: 1 }}>
          <Label>Quantity: </Label>
          <Input
            placeholder="1"
            type="number"
            value={exists.quantity}
            min={0}
            max={availableCodes.length}
            name="existingQuantity"
            key="existingQuantity"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (
                e.target.value <= availableCodes.length &&
                Number(e.target.value) < 0
              ) {
                dispatch(
                  addToCart({
                    product,
                    cart: cart.itemsInCart,
                    quantity: e.target.value,
                    variant: currentVariant,
                  })
                );
              }
            }}
          />
        </Divider>
      ) : (
        <Divider $direction="column" $margin={{ top: 1, bottom: 1 }}>
          <Label>Quantity: </Label>
          <Input
            placeholder="1"
            type="number"
            min={0}
            step={1}
            value={quantity}
            max={availableCodes.length}
            name="newQuantity"
            key="newQuantity"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              // If quantity and current target value are less or equal with what's
              // available, then make it happen
              if (
                Number(e.target.value) <= availableCodes.length &&
                Number(e.target.value) != 0
              ) {
                setQuantity(e.target.value);
              }
              // Otherwise, just set the maximum available
              else {
                setQuantity(availableCodes.length);
              }
            }}
          />
        </Divider>
      )}

      {currentVariant && (
        <Heading $as="h3">
          {formatCurrency({ amount: (currentVariant?.price).toString() })}
        </Heading>
      )}
    </Divider>
  );
};

export { index as Variants };
