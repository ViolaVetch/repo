// Global icons
import { CartIcon, CoinbaseIcon } from "@icons";

// Global components: TBU
import { Loader, Separator } from "@components";

// Core
import { useState, useEffect, useMemo, Fragment } from "react";
import { useRouter } from "next/router";

// Vendors
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import mongoose from "mongoose";

// Global components
import { Divider } from "@components";

// Global types
import { ICoupon, IOrder, IProductCart, Store } from "@types";

// Global methods
import { postItems } from "@methods/postItems";

// State management
import { clearCart } from "redux/cartSlice";

// Local components
import { Coupon } from "./Coupon";

// Global styles
import { Field as Input } from "@styles/Form";

// Global utlities
import { formatCurrency, generateSlug } from "@utils/shared";

const Field = styled(Input)<{ $hasError: boolean }>`
  border-radius: 30px;
  padding-top: 16px;
  padding-bottom: 16px;

  ${({ $hasError }) =>
    $hasError &&
    css`
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}
`;

const Title = styled.h3`
  font-size: 1.45em;
  display: flex;
  margin-left: 0.45em;
  align-items: center;
  color: #333333;
`;

const Body = styled.section`
  display: flex;
  height: 88%;
  flex-direction: column;
  margin-top: 0.5em;
  justify-content: space-between;
`;

const Header = styled.section`
  width: 100%;
  height: 10%;
  border-bottom: 1px solid #eaeef2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1em;
`;

const Info = styled.section`
  display: flex;
  align-items: center;
`;

const Items = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;

const Item = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.5em 0em;

  p {
    color: #333;
    font-size: 0.95em;
  }

  span {
    color: #777;
    font-size: 0.9em;
  }
`;

export const Checkout = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  // Handle loading indicator
  const [loading, setLoading] = useState<boolean>(false);
  const loadingMemo = useMemo(() => loading, [loading]);

  // Cart state
  const cart = useSelector((state: Store) => state.cart);

  // Handle aggregated total
  const [total, setTotal] = useState<number>(0);
  const totalMemo = useMemo(() => total, [total]);

  // Handle sale coupon instance
  const [coupon, setCoupon] = useState<ICoupon | null>(null);
  const couponMemo = useMemo(() => coupon, [coupon]);

  useEffect(() => {
    let newTotal = 0;

    // Reduce items
    cart.itemsInCart.forEach(
      (item: IProductCart) =>
        (newTotal +=
          Number(item["quantity"]) * Number(item["currentVariant"].price))
    );

    // Apply total for cart changes
    setTotal(newTotal);
  }, [cart, coupon]);

  // Email
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();

  type ExtendedOrder = IOrder & {
    total: number;
  };

  const data: ExtendedOrder = {
    _id: new mongoose.Types.ObjectId(),
    email,
    status: "confirmed",
    products: cart.itemsInCart,
    coupon: couponMemo,
    createdAt: new Date(),
    updatedAt: new Date(),
    total: totalMemo,
    path: generateSlug({ length: 15, type: "alphanumeric" }),
  };

  return (
    <Divider
      $padding={2}
      $direction="column"
      $background={{ color: "white" }}
      $options={{
        flex: 1,
        additionalStyles: ({ colors, defaults }) => `
          border: 1px solid ${colors.border};
          border-radius: ${defaults.radius * 2}px;
        `,
      }}
    >
      <Header>
        <Info>
          <CartIcon $size={30} />
          <Title>Checkout</Title>
        </Info>
      </Header>

      <Body>
        {loadingMemo === true ? (
          <Loader />
        ) : cart.itemsInCart.length === 0 ? (
          <>Cart is empty</>
        ) : (
          <>
            <Divider $direction="column">
              {cart.itemsInCart.map(
                (item: IProductCart, index: number): any => (
                  <Divider
                    key={index}
                    $options={{
                      additionalStyles: ({ spaces }) => `
                        margin-top: ${spaces[1]}rem;
                        margin-bottom: ${spaces[1]}rem;
                      `,
                    }}
                  >
                    <Divider $alignItems="center">
                      {item.name}
                      <Divider
                        $margin={{ right: 1, left: 1 }}
                        $options={{
                          additionalStyles: () => `
                          font-size: 13px;
                        `,
                        }}
                      >
                        ({item["currentVariant"]?.name})
                      </Divider>
                      <Divider
                        // $margin={{ left: 1 }}
                        $options={{
                          additionalStyles: ({ colors }) => `
                          font-size: 11px;
                          color: ${colors["grey"]}
                        `,
                        }}
                      >
                        x{item.quantity} x{" "}
                        {item["currentVariant"] &&
                          formatCurrency({
                            amount: item["currentVariant"].price.toString(),
                          })}
                      </Divider>
                    </Divider>

                    <Divider $margin={{ left: "auto" }}>
                      {formatCurrency({
                        amount: (
                          item.currentVariant.price * item.quantity
                        ).toString(),
                      })}
                    </Divider>
                  </Divider>
                )
              )}
            </Divider>

            <Divider $direction="column">
              {/* Total price */}
              <Divider
                $options={{
                  additionalStyles: ({ font }) => `
                    font-size: 20px;
                    font-weight: ${font["weight"]["semiBold"]}
                    line-height: 30px;
                  `,
                }}
              >
                <Divider $direction="column" $justifyContent="center">
                  Total
                  {coupon && (
                    <Divider
                      $options={{
                        additionalStyles: ({ spaces }) => `
                          font-size: 13px;
                          opacity: 0.5;
                        `,
                      }}
                    >
                      Including {coupon["sale"]}% discount
                    </Divider>
                  )}
                </Divider>

                <Divider $margin={{ left: "auto" }}>
                  {/* Reduced total */}
                  {coupon ? (
                    <Fragment>
                      <Divider
                        $options={{
                          additionalStyles: () =>
                            `text-decoration: line-through; margin-right: 10px; opacity: 0.5;`,
                        }}
                      >
                        {formatCurrency({ amount: totalMemo.toString() })}
                      </Divider>

                      {formatCurrency({
                        amount: (
                          totalMemo -
                          totalMemo * (Number(coupon["sale"]) / 100)
                        ).toString(),
                      })}
                    </Fragment>
                  ) : (
                    formatCurrency({ amount: totalMemo.toString() })
                  )}
                </Divider>
              </Divider>

              {/* Linebreak */}
              <Separator $axis="x" $margin={2} />

              {/* Email (required field) */}
              <Divider $direction="column" $margin={{ bottom: 2 }}>
                Email
                <Field
                  placeholder="e.g. john.doe@company.xyz"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  $hasError={Boolean(error)}
                />
                {error && (
                  <Divider
                    $background={{ color: "danger" }}
                    $color="white"
                    $padding={1}
                    $margin={{ bottom: 1 }}
                    $options={{
                      additionalStyles: ({ defaults }) => `
                        border-bottom-left-radius: ${defaults.radius}px;
                        border-bottom-right-radius: ${defaults.radius}px;
                      `,
                    }}
                  >
                    {error}
                  </Divider>
                )}
              </Divider>

              {/* Manage coupon code */}
              <Coupon
                {...{ setLoading, coupon: couponMemo, setCoupon, setTotal }}
              />

              <Divider
                $alignItems="center"
                $justifyContent="center"
                $extends="button"
                $background={{ color: "primary" }}
                $options={{
                  additionalStyles: ({ spaces }) => `
                    border-radius: 30px;
                    opacity: 0.25;
                    cursor: not-allowed;
                    padding: ${spaces[2]}rem;

                    ${
                      email &&
                      `
                        cursor: pointer;
                        opacity: 1;
                    `
                    }
                  `,
                }}
                onClick={async () => {
                  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                  if (!email || !regex.test(email))
                    // Show errors
                    setError(
                      !regex.test(email)
                        ? "Please enter a valid email"
                        : "Please enter an email"
                    );

                  if (email && regex.test(email)) {
                    // Clear errors
                    setError(undefined);
                    // Create order
                    postItems<IOrder>({
                      data,
                      model: "orders",
                      setLoading,
                      dispatch,
                      onSuccess: async ({ data }) => {
                        // Move on the purchase route
                        push(`/order/${data.items[0].path}`);
                        // Wait for half a second
                        setTimeout(() => {
                          // Clear up the cart
                          dispatch(clearCart());
                        }, 500);
                      },
                    });
                  }
                }}
              >
                <CoinbaseIcon $color="white" $size={15} />
                <Divider $color="white" $margin={{ left: 1 }}>
                  Create Checkout
                </Divider>
              </Divider>
            </Divider>
          </>
        )}
      </Body>
    </Divider>
  );
};
