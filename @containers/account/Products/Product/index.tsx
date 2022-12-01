// Core types
import { type FC, useMemo } from "react";

// Core
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Local components
import { Variants } from "./Variants";
import { Filters } from "./Filters";

// Global types
import type { IProduct, IVariant, TAccountPageModesList } from "@types";

// Global components
import {
  Loader,
  Divider,
  Dropzone,
  Checkbox,
  Separator,
  Errors,
} from "@components";
import { Field } from "@components/Form";
import { Account } from "@components/Layouts";

// Vendors
import { useDispatch } from "react-redux";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import mongoose from "mongoose";

// Redux
import { showNotification, hideNotification } from "redux/notificationSlice";

// Global @shared utilities
import { generateSlug, isObjectEmpty, stringToSlug } from "@utils/shared";

// GLobal @methods
import { getItems } from "@methods/getItems";
import { postItems } from "@methods/postItems";
import { putItems } from "@methods/putItems";
import { Header } from "@components/Account";

export interface IProductFields extends IProduct {
  mode: "update" | "add";
  submitted: boolean;
  currentVariant?: IVariant;
}

// Generate a valid path while we change the product name
const AutomaticallyGeneratePath: FC<{}> = () => {
  const { values, setFieldValue } = useFormikContext<IProductFields>();

  const path = useMemo(
    () =>
      `${generateSlug({ length: 7 })}-${generateSlug({
        length: 7,
      })}`,
    [,]
  );

  useEffect(() => {
    if (values["name"])
      if (values["mode"] === "add")
        setFieldValue("path", `${stringToSlug(values["name"])}-${path}`);
  }, [values["name"]]);

  return <></>;
};

export const Product = ({ mode }: { mode: TAccountPageModesList }) => {
  const dispatch = useDispatch();

  // Handle user session
  const { data: session } = useSession();

  // Handle product storing
  const [product, setProduct] = useState<IProduct | null>(null);
  const memoizedProduct = useMemo(() => product, [product]);

  // Handle loader
  const [loading, setLoading] = useState<boolean>(true);
  const loadingMemo = useMemo(() => loading, [loading]);

  // Handle router and route changes
  const { push, query } = useRouter();
  const { id } = query;

  useEffect(() => {
    if (product === null)
      switch (mode) {
        case "update":
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
              _id: id,
            },
          });
          break;
        case "add":
          setTimeout(() => setLoading(false), 750);
          break;
      }
  }, [product, query]);

  const initialValues: IProductFields = {
    _id: new mongoose.Types.ObjectId(),
    thumbnail: "",
    categories: [],
    promote: false,
    codes: [],
    name: "",
    visibility: true,
    description: "",
    price: 0,
    path: "",
    owner: (session as Session)["user"]["_id"],
    user: (session as Session)["user"]["_id"],
    variants: [
      {
        _id: new mongoose.Types.ObjectId(),
        name: "",
        price: 0,
        min: 0,
        codes: [],
      },
    ],
    views: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    // Custom properties
    mode: "add",
    submitted: false,
  };

  return (
    <Account>
      {loadingMemo ? (
        <Loader />
      ) : (
        <Divider
          $direction="column"
          $options={{
            additionalStyles: () => `
              width: 100%;
            `,
          }}
        >
          <Formik
            initialValues={
              mode === "add"
                ? initialValues
                : ({
                    ...memoizedProduct,
                    submitted: false,
                    mode,
                  } as IProductFields)
            }
            validationSchema={() =>
              Yup.lazy((values: IProductFields) =>
                Yup.object().shape({
                  name: Yup.string().required("Please enter a name"),
                  thumbnail: Yup.string().required("Please upload a thumbnail"),
                  description: Yup.string().required(
                    "Please enter a description"
                  ),
                  variants: Yup.array()
                    .of(
                      Yup.object().shape({
                        name: Yup.string().required(
                          "Please enter variant name"
                        ),
                        price: Yup.number()
                          .min(
                            0.1,
                            "Variant price should not be less than $0.1"
                          )
                          .required("Please enter variant price"),
                        min: Yup.number()
                          .min(1, "Variant min. value should be min. 1")
                          .required("Please enter variant min. quantity"),
                      })
                    )
                    .min(1, "Please specify at least 1 variant")
                    .compact(),
                })
              )
            }
            onSubmit={async (data) =>
              // Update product
              mode === "update"
                ? putItems({
                    data,
                    target: data._id,
                    setLoading,
                    dispatch,
                    model: "products",
                    onSuccess: async ({ data: { items } }) => {
                      const [item] = items;
                      // Update current product with the last updates(Position 0 is because of the IResponse type)
                      setProduct(item);
                    },
                  })
                : postItems({
                    data,
                    setLoading,
                    dispatch,
                    model: "products",
                    onSuccess: ({ data: { items } }) => {
                      const [item] = items;
                      // Update url
                      // Push user to product edit page
                      setTimeout(() => {
                        push(`/account/products/${item._id}`);
                      }, 250);
                    },
                  })
            }
          >
            {({ values, errors, touched, setFieldValue, isValidating }) => (
              <Form style={{ width: "100%" }}>
                <Header
                  $title={
                    values["mode"] === "update"
                      ? `Edit ${values.name}`
                      : "New product"
                  }
                >
                  <Filters setLoading={setLoading} />
                </Header>

                {/* Enable errors Component, displaying all errors */}
                {!isObjectEmpty(errors) && values["submitted"] && (
                  <Errors {...errors} />
                )}

                {/* Line between header and content */}
                <Separator $axis="x" $margin={2} />

                {/* Listen to name changes and regenerate path */}
                <AutomaticallyGeneratePath />

                {/* Row */}
                <Divider $margin={{ bottom: 2 }}>
                  <Divider
                    $direction="column"
                    $options={{ additionalStyles: () => `flex: 1;` }}
                  >
                    <Field
                      $variant="static"
                      label="Name*"
                      type="text"
                      name="name"
                    />
                  </Divider>

                  <Divider
                    $padding={{ left: 2, right: 2 }}
                    $direction="column"
                    $options={{ additionalStyles: () => `flex: 1;` }}
                  >
                    <Field
                      $variant="static"
                      label="Product path*"
                      type="text"
                      disabled
                      name="path"
                    />
                  </Divider>

                  <Divider
                    $direction="column"
                    $options={{ additionalStyles: () => `flex: 1;` }}
                  >
                    <Checkbox
                      label="Visibility"
                      placeholder="Product Visibility"
                      text={
                        values["visibility"]
                          ? "Product is Visible"
                          : "Product is not Visible"
                      }
                      selected={values["visibility"]}
                      setSelected={() =>
                        setFieldValue("visibility", !values["visibility"])
                      }
                    />
                  </Divider>
                </Divider>

                {/* Row */}
                <Divider $margin={{ bottom: 2 }}>
                  <Field
                    $variant="static"
                    label="Product Description*"
                    type="textarea"
                    name="description"
                  />
                </Divider>

                {/* Website thumbnail */}
                <Dropzone
                  selectLabel="Website thumbnail"
                  helper="JPG/JPEG or PNG only. Maximum file size allowed is 500KB"
                  label="Website thumbnail*"
                  description="Drop your image here."
                  current={values.thumbnail}
                  hasError={Boolean(errors.thumbnail && touched.thumbnail)}
                  onSuccess={(file: string) =>
                    // Assign logo url
                    setFieldValue("thumbnail", file)
                  }
                  onError={(message: string) => {
                    dispatch(
                      showNotification({
                        message: message ? message : "Something went wrong",
                        success: false,
                      })
                    );
                    // Hide error message
                    setTimeout(() => dispatch(hideNotification("")), 2500);
                  }}
                />

                {/* Row */}
                <Variants />
              </Form>
            )}
          </Formik>
        </Divider>
      )}
    </Account>
  );
};
