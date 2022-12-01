// Vendors
import { useDispatch, useSelector } from "react-redux";

// Icons
import { CartIcon, DeleteIcon, RoundedRemoveIcon, ThumbnailIcon } from "@icons";

// Global components
import { Empty, Button } from "@components";

// State management
import { removeFromCart, addToCart, clearCart } from "redux/cartSlice";

// Vendors
import styled, { css } from "styled-components";

const Product = styled(Divider)`
  ${({ theme: { colors, defaults, spaces } }) => css`
    padding: ${spaces[2]}rem;
    border: 1px solid ${colors.border};
    border-radius: ${defaults.radius * 2}px;
    margin-bottom: ${spaces[2]}rem;
  `}
`;

const Header = styled(Divider)`
  ${({ theme: { colors, spaces } }) => css`
    padding-bottom: ${spaces[2]}rem;
    border-bottom: 1px solid ${colors.border};
    margin-bottom: ${spaces[2]}rem;
  `}
`;

const Stock = styled.input`
  width: 30%;
  min-width: 90px;
  border: 0;
  background: transparent;
  border-radius: 0.7em;
  border: 1px solid #eaeef2;

  ${({ theme: { spaces, colors } }) => css`
    padding: ${spaces[1]}rem ${spaces[2]}rem;
    &:focus {
      border-color: ${colors["primary"]}80;
    }
  `}
`;

// Global types
import { ICode, IProductCart, Store } from "@types";

// Global components
import { Divider, Heading } from "@components";

// Global utilities
import { formatCurrency } from "@utils/shared";

// Global constants
import { AVAILABLECODES } from "@constants";

export const Cart: any = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: Store) => state.cart);

  return (
    <Divider
      $direction="column"
      $options={{
        additionalStyles: ({ defaults, colors, spaces }) => `
          border: 1px solid ${colors["border"]};
          padding: ${spaces[2]}rem;
          border-radius: ${defaults.radius * 2}px;
          background-color: ${colors["white"]};
          width: ${cart.itemsInCart.length === 0 ? "100%" : ""};
        `,
      }}
    >
      {/* Header */}
      <Header $justifyContent="space-between">
        <Heading $as="h4" $icon={<CartIcon $size={40} />}>
          Cart
        </Heading>

        {cart.itemsInCart.length > 0 && (
          <Divider $margin={{ left: "auto" }}>
            <Button
              onClick={() => dispatch(clearCart())}
              $variant="primary"
              $style="outline"
              type="button"
            >
              <DeleteIcon $size={24} />
              Clear Cart
            </Button>
          </Divider>
        )}
      </Header>

      {/* Products list */}
      <Divider $direction="column">
        {/* Empty illustration */}
        {cart.itemsInCart.length === 0 ? (
          <Empty
            heading="Cart is empty"
            description="Explore the products page to add some on your cart."
          />
        ) : (
          cart.itemsInCart.map((product: IProductCart) => {
            // To be converted into a custom fn
            const availableCodes = product.codes.filter((el: ICode) => {
              return (
                el.variant == product.currentVariant._id &&
                AVAILABLECODES.includes(el.status)
              );
            });

            return (
              <Product
                $alignItems="center"
                $direction={{ xs: "column", sm: "column", md: "row" }}
                key={product.currentVariant._id.toString()}
              >
                {product["thumbnail"] !== null ? (
                  <Divider
                    $direction="column"
                    $alignItems="center"
                    $justifyContent="center"
                    $margin={{ lg: { right: 2 } }}
                    $options={{
                      flex: 3,
                      additionalStyles: ({ defaults }) => `
                        min-height: 150px;
                        background-image: url(${product["thumbnail"]});
                        background-size: cover;
                        background-position: center;
                        width: 100%;
                        min-width: 200px;
                        overflow: hidden;
                        border-radius: ${defaults["radius"]}px;

                        img {
                          width: 100%;
                        }
                  `,
                    }}
                  />
                ) : (
                  <Divider
                    $alignItems="center"
                    $justifyContent="center"
                    $direction="column"
                    $margin={{ lg: { right: 2 } }}
                    $background={{ color: "border" }}
                    $options={{
                      flex: 3,
                      additionalStyles: ({ defaults }) => `
                        min-height: 150px;
                        width: 100%;
                        border-radius: ${defaults.radius}px;
                    `,
                    }}
                  >
                    <ThumbnailIcon color="#777" size="1.25em" />
                    No Thumbnail
                  </Divider>
                )}

                <Divider
                  $direction="column"
                  $alignItems="flex-start"
                  $options={{ flex: 3 }}
                  $padding={{ left: 1, right: 1 }}
                  $margin={{
                    xs: { top: 2, bottom: 2 },
                    sm: { top: 2, bottom: 2 },
                    md: { top: 0, bottom: 0 },
                  }}
                >
                  <Heading $as="h3">{product.name}</Heading>
                  <Divider
                    $options={{
                      additionalStyles: ({ spaces }) => `
                        margin-top: ${(spaces[1] as number) / 2}rem;
                        margin-bottom: ${spaces[1]}rem;
                      `,
                    }}
                  >
                    <Divider
                      $options={{
                        additionalStyles: ({ colors, spaces }) => `
                        color: ${colors["grey"]};
                        margin-right: ${(spaces[1] as number) / 2}rem;
                      `,
                      }}
                    >
                      Variant:
                    </Divider>
                    <Divider>{product.currentVariant.name}</Divider>
                  </Divider>

                  <Heading $as="p">
                    {product.description.substring(0, 90)}.
                  </Heading>
                </Divider>

                <Divider
                  $alignItems="center"
                  $justifyContent={{ lg: "flex-end" }}
                  $options={{
                    flex: 2,
                    additionalStyles: () => `
                      width: 100%;
                    `,
                  }}
                >
                  <Stock
                    value={product.quantity}
                    placeholder="1"
                    type="number"
                    max={availableCodes.length}
                    onChange={(e: any): any => {
                      // Allow cart submission only if product quantity is less than available codes quantity
                      if (
                        e.target.value != 0 &&
                        e.target.value <= availableCodes.length &&
                        e.target.value >= product.currentVariant["min"]
                      ) {
                        dispatch(
                          addToCart({
                            cart: cart.itemsInCart,
                            product: product,
                            quantity: e.target.value,
                            variant: product.currentVariant,
                          })
                        );
                      }
                    }}
                  />

                  <Divider
                    $margin={{ left: 1, right: 1 }}
                    $options={{
                      additionalStyles: () => `
                        min-width: 80px;
                      `,
                    }}
                  >
                    {formatCurrency({
                      amount: (
                        product.currentVariant.price * product.quantity
                      ).toString(),
                    })}
                  </Divider>

                  <Divider
                    $options={{ clickable: true }}
                    onClick={() =>
                      dispatch(
                        removeFromCart({ variant: product.currentVariant })
                      )
                    }
                  >
                    <RoundedRemoveIcon $size={24} />
                  </Divider>
                </Divider>
              </Product>
            );
          })
        )}
      </Divider>
    </Divider>
  );
};
