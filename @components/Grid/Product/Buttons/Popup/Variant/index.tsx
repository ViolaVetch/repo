// Core
import { useContext, useState } from "react";

// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// Global Icons
import { Plus, RoundedRemoveIcon } from "@icons";

// Global types
import type { Store, IVariant, IProductCart } from "@types";

// Global components
import { Divider } from "@components";

// Cart store context
import { addToCart, removeFromCart } from "redux/cartSlice";

// Local context
import { GridProductContext } from "@components/Grid/Product";

// Global styles
import { Popover } from "@styles";

// Global shared utilities
import { formatCurrency } from "@utils/shared";
import { AVAILABLECODES } from "@constants";

const Item = styled.div`
  position: relative;
  z-index: 2;
  display: flex;

  ${({ theme: { spaces, colors } }) => css`
    padding: ${(spaces[1] as number) * 1}rem;
    color: ${colors["grey"]};

    &:not(:last-of-type) {
      border-bottom: 1px solid ${colors["border"]};
      margin-bottom: ${(spaces[1] as number) * 1.5}rem;
    }
  `}
`;

const Stock = styled.input<{ $disabled: boolean }>`
  width: 100%;
  width: 70px;

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  -moz-appearance: textfield;

  ${({ theme: { spaces, colors } }) => css`
    padding: ${(spaces[1] as number) / 1.25}rem;
    border: 1px solid ${colors["border"]};
    background-color: ${colors["border"]};
    border-radius: 30px;
  `}
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;

export const Variant: FC<IVariant> = (variant) => {
  const dispatch = useDispatch();

  // Local context
  const { product } = useContext(GridProductContext);

  // Handle variant quantity
  const [quantity, setQuantity] = useState(variant.min);

  // Handle variant quantity
  const [isHovered, setIsHovered] = useState(false);

  // Cart state
  const cart = useSelector((state: Store) => state.cart.itemsInCart);

  // Handle adding product to cart
  const handleAddToCart = ({ product, variant, quantity }: any) =>
    dispatch(
      addToCart({
        product,
        quantity: quantity ? quantity : 1,
        variant,
      })
    );

  // Variant stock
  const currentVariantTotal = product.codes.filter(
    (code) => code.variant.toString() == variant._id.toString()
  );

  // Check if this variant is available
  const available = currentVariantTotal.filter((el) =>
    AVAILABLECODES.includes(el["status"])
  );
  const isInStock = available.length >= variant.min;

  // Check if this variant is on cart
  const productInCart = cart.some(
    (item: IProductCart) => item.currentVariant?._id == variant._id
  );

  const handleCart = () => {
    if (!productInCart) {
      if (available) {
        // Check if product has codes, if not, don't allow to be added on cart
        handleAddToCart({ product, variant: variant, quantity });
      }
    } else {
      // Remove product from then cart
      dispatch(removeFromCart({ variant }));
    }
  };

  return (
    <Item key={variant._id.toString()}>
      <Divider
        $options={{
          additionalStyles: ({ colors, font }) => `
            color: ${colors["secondary"]};
            align-items: center;
            justify-content: center;
            flex: 0 0 45px;
            border-radius: 30px;
            font-size: 16px;
            padding: 5px;
            font-weight: ${font["weight"]["semiBold"]};
            border-right: 2px solid ${colors["border"]};
          `,
        }}
      >
        {formatCurrency({ amount: (variant?.price).toString() })}
      </Divider>
      <Divider $options={{ flex: 1 }}>
        <Divider $margin={{ left: 1 }} $direction="column">
          <Divider
            $options={{
              additionalStyles: () => `
                font-size: 14px;
              `,
            }}
            $color="secondary"
          >
            {variant.name}
          </Divider>

          <Divider
            $options={{
              additionalStyles: () => `
                font-size: 10px;
              `,
            }}
          >
            {`${available.length} in stock`}
          </Divider>
        </Divider>
      </Divider>

      <Divider
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Update quantity */}
        <Divider $margin={{ left: "auto" }}>
          {isHovered && (
            <Popover>
              Min. quantity is {variant.min}
              {Number(variant.max)
                ? ` and Max. quantity is ${variant.max}.`
                : "."}
            </Popover>
          )}

          <Stock
            $disabled={!isInStock}
            type="number"
            size={quantity}
            value={quantity}
            min={variant.min}
            max={variant.max ? variant.max : available.length}
            onBlur={(e) => {
              const num = Number(e.target.value);

              // Check if the product has a max. limit
              if (variant.max) {
                // Complex fellow unlikely to be clean
                if (num == 0 && num < available.length)
                  setQuantity(Number(variant.min));
                // Check if number is bigger than available.length
                // If it is, return the max. allowed
                else if (num > available.length) setQuantity(available.length);
                else if (num < variant.min) setQuantity(variant.min);
                else if (num > variant.max) setQuantity(variant.max);
              } else {
                // Complex fellow unlikely to be clean
                if (num == 0) {
                  if (available.length >= variant.min) {
                    setQuantity(variant.min);
                  }
                } else {
                  // If num number is smaller than variant minimum
                  // set number to variant minimum
                  if (num < variant.min) {
                    setQuantity(variant.min);
                  }
                  if (num > available.length && num > variant.min) {
                    setQuantity(available.length);
                  }
                }
              }
            }}
            onChange={(e) =>
              available.length && setQuantity(Number(e.target.value))
            }
          />
        </Divider>

        <Divider
          onClick={() => isInStock && handleCart()}
          $alignItems="center"
          $options={{
            additionalStyles: ({ colors, spaces }) => `
            cursor: pointer;
            font-size: 13px;
            color: ${colors["white"]};
            background-color: ${colors[productInCart ? "white" : "primary"]};
            border: 1px solid ${colors[productInCart ? "primary" : "white"]};
            padding: ${spaces[1]}rem;
            margin-left: ${spaces[1]}rem;
            border-radius: 30px;
            
            svg {
              margin-right:  ${(spaces[1] as number) / 2}rem;
            }
            
            ${
              !isInStock &&
              `
                opacity: 0.5; 
                cursor: not-allowed; 
              `
            }
          `,
          }}
        >
          {productInCart ? (
            <RoundedRemoveIcon $size={14} $color="primary" />
          ) : (
            <Plus $size={14} $color="white" />
          )}

          <Divider $color={productInCart ? "primary" : "white"}>
            {productInCart ? "Remove" : "Add to cart"}
          </Divider>
        </Divider>
      </Divider>
    </Item>
  );
};
