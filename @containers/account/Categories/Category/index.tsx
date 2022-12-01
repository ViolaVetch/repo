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
import mongoose from "mongoose";
import * as Yup from "yup";

// Local components
import { Filters } from "./Filters";

// Global methods
import { getItems } from "@methods/getItems";
import { postItems } from "@methods/postItems";
import { putItems } from "@methods/putItems";

// Global types
import { IProductCategory } from "@types";

interface IProductCategoryFields extends IProductCategory {}

const Fieldgroup = styled(Divider)`
  flex-direction: column;
  ${({ theme: { breakpoints, spaces, colors, font, ...theme } }) => css`
    margin-bottom: ${(spaces[3] as number) / 1.25}rem;
    @media (max-width: ${breakpoints["md"]}px) {
      flex: 0 0 100%;
    }
  `}
`;

export const Category = ({ mode }: any) => {
  const dispatch = useDispatch();

  const [category, setCategory] = useState<IProductCategory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const {
    query: { id },
    push,
  } = useRouter();

  const [notFound, setNotFound] = useState(false);
  const notFoundMemo = useMemo(() => notFound, [notFound]);

  useEffect(() => {
    if (category === null) {
      if (mode === "update") {
        getItems<IProductCategory>({
          model: "categories",
          query: { _id: id },
          onSuccess: ({ data }) => {
            if (data["length"] === 0) {
              setNotFound(true);
            } else {
              const [item] = data["items"];
              setCategory(item);
            }
          },
          setLoading,
          dispatch,
        });
      }

      if (mode === "add") {
        setCategory({
          name: "",
          path: "",
          _id: new mongoose.Types.ObjectId(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        setLoading(false);
      }
    }
  }, [mode, category]);

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
            ? "Add category"
            : loading === true
            ? "Loading..."
            : "Edit category"
        }
      >
        <Filters setLoading={setLoading} />
      </Header>

      {loading ? (
        <Loader />
      ) : (
        category !== null && (
          <Divider
            $direction="column"
            $options={{ additionalStyles: () => `width: 100%;` }}
          >
            <Formik
              initialValues={
                {
                  mode,
                  submitted: false,
                  ...category,
                } as IProductCategoryFields
              }
              validationSchema={() =>
                Yup.lazy((values: IProductCategoryFields) =>
                  Yup.object().shape({
                    name: Yup.string().required("Please enter a first name"),
                  })
                )
              }
              onSubmit={async (data: IProductCategoryFields) => {
                mode === "update"
                  ? putItems({
                      model: "categories",
                      data,
                      target: data["_id"],
                      setLoading,
                      dispatch,
                      onSuccess: ({ data }) => {
                        // Grab the first item (category)
                        const [item] = data["items"];
                        // Set category locally
                        setCategory(item);
                      },
                    })
                  : postItems({
                      model: "categories",
                      data,
                      setLoading,
                      dispatch,
                      onSuccess: ({ data }) => {
                        const [item] = data["items"];
                        // Store the saved category
                        setCategory(item);
                        // Change url (which will trigger mode change)
                        push(`/account/categories/${item["_id"]}`);
                      },
                    });
              }}
            >
              {({ values, setFieldValue }) => (
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
                        flex: 0 0 100%;
                      `,
                      }}
                    >
                      <Field
                        $variant="static"
                        label="Category name*"
                        type="text"
                        name="name"
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
