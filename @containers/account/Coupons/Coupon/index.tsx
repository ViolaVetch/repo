// Global components
import { Account } from "@components/Layouts";
import { Loader, Checkbox, Empty, Divider, Number, Button } from "@components";
import { Header } from "@components/Account";
import { Field } from "@components/Form/Field";

// Core
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

// Vendors
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Local components
import Filters from "./Filters";
import { History } from "./History";

// Global methods
import { getItems } from "@methods/getItems";
import { postItems } from "@methods/postItems";
import { putItems } from "@methods/putItems";

// Global types
import { ICoupon, IOrder } from "@types";
import { AddIcon } from "@icons";
import mongoose from "mongoose";

interface ICouponFields extends ICoupon {}

const Fieldgroup = styled(Divider)`
  flex-direction: column;
  ${({ theme: { breakpoints, spaces, colors, font, ...theme } }) => css`
    margin-bottom: ${(spaces[3] as number) / 1.25}rem;
    @media (max-width: ${breakpoints["md"]}px) {
      flex: 0 0 100%;
    }
  `}
`;

export const Coupon = ({ mode }: any) => {
  const dispatch = useDispatch();

  const [coupon, setCoupon] = useState<ICoupon | null>(null);
  const [loading, setLoading]: any = useState<boolean>(true);

  const {
    query: { id },
    push,
  } = useRouter();

  const [notFound, setNotFound] = useState(false);
  const notFoundMemo = useMemo(() => notFound, [notFound]);

  useEffect(() => {
    if (coupon === null) {
      if (mode === "update") {
        getItems<ICoupon>({
          model: "coupons",
          query: { _id: id },
          onSuccess: ({ data }) => {
            if (data["length"] === 0) {
              setNotFound(true);
            } else {
              const [item] = data["items"];
              setCoupon(item);
            }
          },
          setLoading,
          dispatch,
        });
      }

      if (mode === "add") {
        setCoupon({
          code: "",
          sale: 0,
          usable: true,
          uses: 0,
          history: [],
          _id: new mongoose.Types.ObjectId(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        setLoading(false);
      }
    }
  }, [mode, coupon]);

  if (notFoundMemo === true) {
    return (
      <Account>
        <Empty
          heading="Please try again later"
          description="Please check the given URL, or ask for another one, because this page was not found."
        />
      </Account>
    );
  }

  return (
    <Account>
      <Header
        $title={
          mode === "add"
            ? "Add Coupon"
            : loading === true
            ? "Loading..."
            : "Edit Coupon"
        }
      >
        <Filters setLoading={setLoading} mode={mode} />
      </Header>

      {loading ? (
        <Loader />
      ) : (
        coupon !== null && (
          <Divider
            $direction="column"
            $options={{ additionalStyles: () => `width: 100%;` }}
          >
            <Formik
              initialValues={
                {
                  mode,
                  submitted: false,
                  ...coupon,
                } as ICouponFields
              }
              validationSchema={() =>
                Yup.lazy((values: ICouponFields) =>
                  Yup.object().shape({
                    code: Yup.string().required("Please enter a first name"),
                    sale: Yup.string().required("Please enter a last name"),
                    usable: Yup.boolean().required("Please enter a last name"),
                  })
                )
              }
              onSubmit={async (data: ICouponFields) => {
                mode === "update"
                  ? putItems({
                      model: "coupons",
                      data,
                      target: data["_id"],
                      setLoading,
                      dispatch,
                      onSuccess: ({ data }) => {
                        // Grab the first item (coupon)
                        const [item] = data["items"];
                        // Set coupon locally
                        setCoupon(item);
                      },
                    })
                  : postItems({
                      model: "coupons",
                      data,
                      setLoading,
                      dispatch,
                      onSuccess: ({ data }) => {
                        const [item] = data["items"];
                        // Store the saved coupon
                        setCoupon(item);
                        // Change url (which will trigger mode change)
                        push(`/account/coupons/${item["_id"]}`);
                      },
                    });
              }}
            >
              {({ values, setFieldValue, errors }) => (
                <Form autoComplete="off">
                  <Divider
                    $options={{
                      additionalStyles: ({ spaces, colors }) => `
                      width: 100%;
                      flex-wrap: wrap;
                    `,
                    }}
                  >
                    <Fieldgroup
                      $padding={{ sm: { right: 1 } }}
                      $options={{
                        additionalStyles: ({ spaces }) => `
                        z-index: 5;
                        flex: 0 0 50%;
                      `,
                      }}
                    >
                      <Field
                        $variant="static"
                        label="Coupon code*"
                        type="text"
                        name="code"
                      />
                    </Fieldgroup>

                    <Fieldgroup
                      $padding={{ sm: { left: 1 } }}
                      $options={{
                        additionalStyles: () => `
                        z-index: 5;
                        flex: 0 0 50%;
                      `,
                      }}
                    >
                      <Number
                        $label="Sale*"
                        $value={values["sale"]}
                        $max={100}
                        $min={0}
                        onUpdate={(value) => {
                          setFieldValue("sale", value ? value : 0);
                        }}
                      />
                    </Fieldgroup>

                    <Fieldgroup
                      $padding={{ sm: { right: 1 } }}
                      $options={{
                        additionalStyles: () => `
                        z-index: 5;
                        flex: 0 0 50%;
                      `,
                      }}
                    >
                      <Checkbox
                        label="Coupon availability"
                        placeholder="Coupon availability"
                        text={
                          values["usable"]
                            ? "Coupon is Available"
                            : "Coupon is not Available"
                        }
                        selected={values["usable"]}
                        setSelected={() =>
                          setFieldValue("usable", !values["usable"])
                        }
                      />
                    </Fieldgroup>

                    <Fieldgroup
                      $padding={{ sm: { left: 1 } }}
                      $options={{
                        additionalStyles: () => `
                        z-index: 5;
                        flex: 0 0 50%;
                      `,
                      }}
                    >
                      <Number
                        $label="Coupon use limit*"
                        $value={values["uses"]}
                        $max={100}
                        $min={0}
                        onUpdate={(value) => {
                          setFieldValue("uses", value ? value : 0);
                        }}
                      />
                    </Fieldgroup>

                    <Divider
                      $margin={{ bottom: 3 }}
                      $options={{ additionalStyles: () => `flex: 0 0 100%;` }}
                    >
                      <Button
                        icon={{
                          $icon: mode === "add" ? "plus" : "save",
                          $size: 20,
                          $color: "white",
                        }}
                        $variant="primary"
                        type="submit"
                      >
                        {mode === "update" ? "Save changes" : "Create"}
                      </Button>
                    </Divider>

                    {mode === "update" && coupon["history"] && (
                      <History history={coupon["history"]} />
                    )}
                  </Divider>
                </Form>
              )}
            </Formik>
          </Divider>
        )
      )}
    </Account>
  );
};
