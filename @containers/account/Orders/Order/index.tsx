// Core types
import { FC } from "react";

// Core
import { Fragment, useMemo, useEffect, useState } from "react";
import { useRouter } from "next/router";

// Vendors
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Formik, Form, useFormikContext } from "formik";

// Local container components
import { Payment } from "@containers/account/Orders";

// Redux
import { showNotification } from "redux/notificationSlice";

// Local components
import { Filters } from "./Filters";
import { Products } from "./Products";
import { Discount } from "./Discount";
import { Amounts } from "./Amounts";

// Global components
import { Loader, Divider, Heading, Separator } from "@components";
import { Account } from "@components/Layouts";

// Global types
import { IOrder, IResponse } from "@types";

// Global icons
import { Tick, Replacement as ReplacementIcon } from "@icons";

// Order methods
import { useSession } from "next-auth/react";

// Global methods
import { getItems } from "@methods/getItems";
import { putItems } from "@methods/putItems";
import { Header } from "@components/Account";
import { Coinbase } from "./Coinbase";

export type IOrderFields = IOrder & {
  notes?: string;
  hasIssues?: boolean;
};

const Label = styled.label`
  ${({ theme: { spaces } }) => css`
    margin-bottom: ${spaces[1]}rem;
  `}
`;

const Content = styled.label`
  display: flex;
  min-height: 30px;
`;

const Button = styled(Divider)`
  border-radius: 30px;
  cursor: pointer;
  font-size: 14px;
  align-items: center;

  ${({ theme: { spaces, colors } }) => css`
    margin-left: ${spaces[1]}rem;
    color: ${colors["white"]};
    background-color: ${colors["success"]};
    padding: ${(spaces[1] as number) / 2}rem ${spaces[2]}rem;

    &:hover {
      background-color: ${colors["success"]}DD;
    }

    &:active {
      transform: scale(0.975);
    }

    svg {
      margin-right: ${(spaces[1] as number) / 2}rem;
    }
  `}
`;

interface IShared {
  setLoading: (a: boolean) => void;
  setOrder: (order: IOrder) => void;
}

// Auto submit each change happens on the form
const AutoSubmit: FC<{}> = () => {
  const { values, setSubmitting: setLoading } =
    useFormikContext<IOrderFields>();

  const [count, setCount] = useState(0);
  const countMemo = useMemo(() => count, [count]);

  // Redux dispatch
  const dispatch = useDispatch();

  // Listen to changes
  useEffect(() => {
    let count = countMemo;

    if (count > 0)
      putItems({
        target: values._id,
        data: values,
        model: "orders",
        setLoading,
        onSuccess: () => {},
        dispatch,
      });
    else {
      // Increase count
      count++;
      // Store increased count
      setCount(count);
    }
  }, [values["issuesReplaced"], values["status"], values["products"]]);

  return <></>;
};

const Resolve: FC<IShared> = ({ setOrder, setLoading }) => {
  // Grab current order values
  const { values } = useFormikContext<IOrderFields>();

  // Redux dispatch
  const dispatch = useDispatch();

  // Handle fulfillment
  const handleFulfillment = async () =>
    await axios
      .post<IResponse<IOrder>>("/api/v1/orders/resolve", {
        _id: values["_id"],
      })
      .then(({ data }) => {
        // Start site loader
        setLoading(true);

        // Check if data exists
        if (data["status"] == "success") {
          // Grab first item found
          const [item] = data["data"]["items"];

          // Update local order
          setOrder(item);

          // Show success message
          dispatch(
            showNotification({
              message: "Order successfully resolved",
              success: true,
            })
          );
        }

        // Disabled loader
        setTimeout(() => setLoading(false), 300);
      })
      .catch((err) =>
        dispatch(
          showNotification({
            message: "Order couldn't be resolved",
            success: false,
          })
        )
      );

  return (
    <Button onClick={handleFulfillment}>
      <ReplacementIcon $color="white" $size={20} />
      Resolve
    </Button>
  );
};

const Mark: FC<IShared> = ({ setOrder, setLoading }) => {
  // Grab current order values
  const { values } = useFormikContext<IOrderFields>();

  // Redux dispatch
  const dispatch = useDispatch();

  // Handle fulfillment
  const handleMark = async () =>
    await axios
      .post<IResponse<IOrder>>("/api/v1/orders/mark", {
        _id: values["_id"],
      })
      .then(({ data }) => {
        // Start site loader
        setLoading(true);

        // Check if data exists
        if (data["status"] == "success") {
          // Grab first item found
          const [item] = data["data"]["items"];

          // Update local order
          setOrder(item);

          // Show success message
          dispatch(
            showNotification({
              message: "Order successfully marked as Paid",
              success: true,
            })
          );
        }

        // Disabled loader
        setTimeout(() => setLoading(false), 300);
      })
      .catch(({ response }) =>
        dispatch(
          showNotification({
            message: response["data"].message,
            success: false,
          })
        )
      );

  return (
    <Button onClick={handleMark}>
      <Tick $size={15} $color="white" />
      Mark as Paid
    </Button>
  );
};

export const Order = ({ mode }: any) => {
  const { data: session } = useSession();

  const dispatch = useDispatch();
  // Manage order fields
  const [order, setOrder] = useState<IOrder | null>(null);
  const orderMemo = useMemo(() => order, [order]);

  // Manage loading
  const [loading, setLoading] = useState(true);

  // Handle router
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (orderMemo === null) {
      if (mode === "update") {
        getItems<IOrder>({
          query: {
            _id: id,
          },
          model: "orders",
          setLoading,
          dispatch,
          onSuccess: ({ data: { items } }) => {
            // Get the first found order
            const [item] = items;
            // Apply order
            setOrder(item);
          },
        });
      }

      if (mode === "add") {
        setOrder(null);
        setLoading(false);
      }
    }
  }, [orderMemo]);

  return (
    <Fragment>
      <Account>
        {!loading && orderMemo ? (
          <Formik
            initialValues={
              {
                ...orderMemo,
              } as IOrderFields
            }
            onSubmit={async (data, { setSubmitting: setLoading }) => {
              putItems({
                target: data._id,
                data,
                model: "orders",
                setLoading,
                onSuccess: () => {},
                dispatch,
              });
            }}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form style={{ width: "100%" }}>
                  <Header $title={`Edit order #${values._id.toString()}`}>
                    <Filters
                      $path={orderMemo["path"]}
                      setLoading={setLoading}
                    />
                  </Header>

                  {/* Line between header and content */}
                  <Separator $axis="x" $margin={2} />

                  {/* Autosubmit token */}
                  <AutoSubmit />

                  {order === null || loading ? (
                    <Loader />
                  ) : (
                    <Divider
                      $direction="column"
                      $options={{
                        additionalStyles: ({ colors }) => `
                          width: 100%;
                        `,
                      }}
                    >
                      {/* Order informations */}
                      <Divider $direction="column" $margin={{ bottom: 2 }}>
                        {/* Header */}
                        <Divider $direction="column" $padding={{ bottom: 3 }}>
                          <Heading $as="h3">Details</Heading>
                        </Divider>

                        <Divider
                          $options={{ additionalStyles: () => `widith: 100%;` }}
                        >
                          <Divider
                            $direction="column"
                            $options={{ additionalStyles: () => `flex: 1;` }}
                          >
                            <Label>Email address</Label>
                            <Content>{order["email"]}</Content>
                          </Divider>

                          <Divider
                            $padding={{ left: 1, right: 1 }}
                            $direction="column"
                            $options={{ additionalStyles: () => `flex: 1;` }}
                          >
                            <Label>Total price</Label>
                            <Content>
                              <Payment
                                $products={values["products"]}
                                $coupon={values["coupon"]}
                                $type="amount"
                              />
                            </Content>
                          </Divider>

                          <Divider
                            $direction="column"
                            $options={{ additionalStyles: () => `flex: 1;` }}
                          >
                            <Label>Payment status</Label>
                            <Content>
                              <Payment $status={values["status"]} />

                              {/* Allow updating the status only for admins */}
                              {session?.user.role == "admin" &&
                                {
                                  pending: "",
                                  failed: "",
                                  confirmed: "",
                                  created: (
                                    <Mark {...{ setOrder, setLoading }} />
                                  ),
                                  unfulfilled: (
                                    <Resolve {...{ setOrder, setLoading }} />
                                  ),
                                }[values.status]}
                            </Content>
                          </Divider>
                        </Divider>

                        {/* Order discount */}
                        {values.coupon && <Discount />}
                      </Divider>

                      {values["status"] == "confirmed" &&
                        values["event"] &&
                        session?.user["role"] === "admin" && <Coinbase />}

                      {values["status"] == "confirmed" && <Amounts />}

                      <Products />
                    </Divider>
                  )}
                </Form>
              );
            }}
          </Formik>
        ) : (
          <Loader />
        )}
      </Account>
    </Fragment>
  );
};
