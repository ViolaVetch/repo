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

// Global methods
import { getItems } from "@methods/getItems";
import { postItems } from "@methods/postItems";
import { putItems } from "@methods/putItems";

// Global types
import mongoose from "mongoose";

// Global types
import { IPage, TAccountPageModesList } from "@types";

interface IPageFields extends IPage {}

const Fieldgroup = styled(Divider)`
  flex-direction: column;
  ${({ theme: { breakpoints, spaces, colors, font, ...theme } }) => css`
    margin-bottom: ${spaces[2]}rem;
    @media (max-width: ${breakpoints["md"]}px) {
      flex: 0 0 100%;
    }
  `}
`;

export const Page = ({ mode }: { mode: TAccountPageModesList }) => {
  const dispatch = useDispatch();

  // Handle current page instance
  const [page, setPage] = useState<IPage | null>(null);
  const pageMemo = useMemo(() => page, [page]);

  // Handle loader
  const [loading, setLoading] = useState(true);
  const loadingMemo = useMemo(() => loading, [loading]);

  const { query, push } = useRouter();
  const { id } = query;

  useEffect(() => {
    if (page === null) {
      if (mode === "update") {
        getItems<IPage>({
          model: "pages",
          query: { _id: id },
          onSuccess: ({ data }) => {
            const [item] = data["items"];
            setPage(item);
          },
          dispatch,
          setLoading,
        });
      }

      if (mode === "add") {
        setPage({
          _id: new mongoose.Types.ObjectId(),
          title: "",
          description: "",
          path: "",
          views: 0,
          content: "",
          visibility: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        setLoading(false);
      }
    }
  }, [page]);

  return (
    <Account>
      <Header
        $title={
          mode === "add"
            ? "Add Page"
            : loading === true
            ? "Loading..."
            : "Edit Page"
        }
      >
        <Filters setLoading={setLoading} />
      </Header>

      {loading ? (
        <Loader />
      ) : (
        page !== null && (
          <Divider
            $direction="column"
            $options={{ additionalStyles: () => `width: 100%;` }}
          >
            <Formik
              initialValues={
                {
                  mode,
                  submitted: false,
                  ...page,
                } as IPageFields
              }
              validationSchema={() =>
                Yup.lazy((values: IPageFields) =>
                  Yup.object().shape({
                    // code: Yup.string().required("Please enter a first name"),
                    // sale: Yup.string().required("Please enter a last name"),
                    // usable: Yup.boolean().required("Please enter a last name"),
                  })
                )
              }
              onSubmit={async (data: IPageFields) => {
                mode === "update"
                  ? putItems({
                      model: "pages",
                      data,
                      target: data["_id"],
                      setLoading,
                      dispatch,
                      onSuccess: ({ data }) => {
                        // Grab the first item (page)
                        const [item] = data["items"];
                        // Set page locally
                        setPage(item);
                      },
                    })
                  : postItems({
                      model: "pages",
                      data,
                      setLoading,
                      dispatch,
                      onSuccess: ({ data }) => {
                        const [item] = data["items"];
                        // Store the saved coupon
                        setPage(item);

                        // Change url (which will trigger mode change)
                        push(`/account/coupons/${item["_id"]}`);
                      },
                    });
              }}
            >
              {({ values, setFieldValue }) => (
                <Form autoComplete="off">
                  <Divider
                    $options={{
                      additionalStyles: () => `
                      width: 100%;
                      flex-wrap: wrap;
                    `,
                    }}
                  >
                    <Fieldgroup
                      $padding={{ sm: { right: 1 } }}
                      $options={{
                        additionalStyles: () => `
                        z-index: 5;
                        flex: 0 0 50%;
                      `,
                      }}
                    >
                      <Field
                        $variant="static"
                        label="Title*"
                        type="text"
                        name="title"
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
                      <Checkbox
                        label="Page visibility"
                        placeholder="Page visibility"
                        text={
                          values["visibility"]
                            ? "Page is Published"
                            : "Page is Unpublished"
                        }
                        selected={values["visibility"]}
                        setSelected={() =>
                          setFieldValue("visibility", !values["visibility"])
                        }
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
                      <Field
                        $variant="static"
                        label="Path *"
                        type="text"
                        name="path"
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
                      <Field
                        $variant="static"
                        label="Description *"
                        type="text"
                        name="description"
                      />
                    </Fieldgroup>

                    <Fieldgroup
                      $padding={{ sm: { right: 1 } }}
                      $options={{
                        additionalStyles: () => `
                          z-index: 5;
                          flex: 0 0 100%;
                          textarea {
                            min-height: 300px !important;
                            resize: vertical !important;
                          }
                        `,
                      }}
                    >
                      <Field
                        $variant="static"
                        label="Content *"
                        type="textarea"
                        name="content"
                      />
                    </Fieldgroup>

                    <Divider
                      $margin={{ top: 3 }}
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
