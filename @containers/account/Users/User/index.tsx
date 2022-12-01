// Core
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Vendors
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import mongoose from "mongoose";

// Vendor types
import type { FormikHelpers } from "formik";

// Local components
import { Filters } from "./Filters";

// Global components
import { Loader, Divider, Errors } from "@components";
import { Account } from "@components/Layouts";

// Careful: Imported from different containers
import { Informations } from "./Informations";
import { Password } from "./Password";
import { Buttons } from "./Buttons";

// Global types
import { IAccountPageModes, User as IUser } from "@types";

// Global utils
import { isObjectEmpty } from "@utils/shared";

// Global methods
import { getItems } from "@methods/getItems";
import { putItems } from "@methods/putItems";
import { postItems } from "@methods/postItems";
import { Header } from "@components/Account";

export interface IUserFields extends IUser {
  hasNewPassword?: boolean;
  submitted: boolean;
  mode: "add" | "update";
}

export const User = ({ mode, setMode }: IAccountPageModes) => {
  const dispatch = useDispatch();
  // Handle user
  const [user, setUser] = useState<IUser | null>(null);
  // Handle state loading
  const [loading, setLoading] = useState(true);
  // Manage page routing
  const {
    query: { id },
    push,
  } = useRouter();

  const initialValues: IUserFields = {
    _id: new mongoose.Types.ObjectId(),
    firstName: "",
    lastName: "",
    password: "",
    active: true,
    mode: "add",
    email: "",
    role: "user",
    submitted: false,
    createdAt: new Date(),
  };

  useEffect(() => {
    if (user === null) {
      if (mode === "update") {
        id !== "new" &&
          getItems<IUser>({
            model: "users",
            query: { _id: id },
            onSuccess: ({ data }) => {
              const [item] = data.items;
              setUser(item);
            },
            setLoading,
            dispatch,
          });
      }

      if (mode === "add") {
        setLoading(false);
      }
    }
  }, [user, mode, id]);

  return (
    <Account>
      <Header
        $title={
          mode === "add"
            ? "Add User"
            : loading === true
            ? "Loading..."
            : "Edit User"
        }
      >
        <Filters
          name="Came here"
          id={id}
          loading={loading}
          setLoading={setLoading}
          mode={mode}
          setMode={setMode}
        />
      </Header>

      {
        {
          add: (
            <Formik
              initialValues={initialValues}
              validationSchema={() =>
                Yup.lazy((values: IUserFields) => {
                  const defaultSchema = {
                    firstName: Yup.string().required(
                      "Please enter a first name"
                    ),
                    password: Yup.string()
                      .matches(
                        /[a-zA-Z\d]{6,32}/,
                        "Password should be alphanumberic, min. 6 characters"
                      )
                      .required("Please enter a password"),
                    lastName: Yup.string().required("Please enter a last name"),
                    email: Yup.string()
                      .email("Please a valid e-mail address")
                      .required("Please an email"),
                  };

                  // Return default scheuma
                  return Yup.object().shape(defaultSchema);
                })
              }
              onSubmit={async (
                data: IUserFields,
                { setSubmitting }: FormikHelpers<IUserFields>
              ) => {
                postItems({
                  data,
                  model: "users",
                  dispatch,
                  setLoading,
                  onSuccess: ({ data }) => {
                    // Grab first found item
                    const [item] = data.items;
                    // Move route
                    push(`/account/users/${item["_id"]}`);
                    // Wiat for a bit
                    setTimeout(() => {
                      // Disable loader
                      setLoading(false);
                      // Disable submitting
                      setSubmitting(false);
                    }, 300);
                  },
                });
              }}
            >
              {({ values, errors }) => (
                <Divider
                  $direction="column"
                  $options={{
                    additionalStyles: ({ spaces, colors }) => `
                    width: 100%;
                  `,
                  }}
                >
                  {/* Aha */}
                  {!isObjectEmpty(errors) && values["submitted"] && (
                    <Errors {...errors} />
                  )}

                  {/* Form */}
                  <Form autoComplete="off">
                    <Divider $direction="column">
                      {/* Informations */}
                      <Informations $isReseller={false} />

                      {/* Update password */}
                      <Password mode={mode} />

                      {/* Reseller actions */}
                      <Buttons />
                    </Divider>
                  </Form>
                </Divider>
              )}
            </Formik>
          ),
          update: (
            <>
              {loading ? (
                <Loader />
              ) : (
                <Formik
                  initialValues={
                    {
                      mode,
                      hasNewPassword: false,
                      newPassword: "",
                      submitted: false,
                      ...user,
                    } as IUserFields
                  }
                  validationSchema={() =>
                    Yup.lazy((values: IUserFields) => {
                      const defaults = {
                        firstName: Yup.string().required(
                          "Please enter a first name"
                        ),
                        lastName: Yup.string().required(
                          "Please enter a last name"
                        ),
                        email: Yup.string()
                          .email("Please a valid e-mail address")
                          .required("Please an email"),
                      };

                      const defaultSchema =
                        values["role"] === "reseller"
                          ? { ...defaults, percentage: Yup.number().required() }
                          : { ...defaults };

                      // Check if password should be modified
                      if (values["hasNewPassword"])
                        return Yup.object().shape({
                          ...defaultSchema,
                          newPassword: Yup.string()
                            .matches(
                              /[a-zA-Z\d]{6,32}/,
                              "Password should be alphanumberic, min. 6 characters"
                            )
                            .required("Please enter a password"),
                        });

                      // Return default scheuma
                      return Yup.object().shape({
                        ...defaultSchema,
                      });
                    })
                  }
                  onSubmit={async (
                    data: IUserFields,
                    { setSubmitting }: FormikHelpers<IUserFields>
                  ) =>
                    putItems({
                      model: "users",
                      target: data._id,
                      data,
                      setLoading,
                      dispatch,
                      onSuccess: ({ data }) => {
                        // Grab the newfound item
                        const [item] = data.items;
                        // Store new user
                        setUser(item);
                        // Wait for half a second
                        setTimeout(() => {
                          // Disable loader
                          setLoading(false);
                          // Disable submitting
                          setSubmitting(false);
                        }, 500);
                      },
                    })
                  }
                >
                  {({ values, errors }) => (
                    <Divider
                      $direction="column"
                      $options={{
                        additionalStyles: ({ spaces, colors }) => `
                            width: 100%;
                          `,
                      }}
                    >
                      <Form autoComplete="off">
                        <Divider $direction="column">
                          {/* Informations */}
                          <Informations $isReseller={false} />

                          {/* Update password */}
                          <Password mode={mode} />

                          {/* Reseller actions */}
                          <Buttons />
                        </Divider>
                      </Form>
                    </Divider>
                  )}
                </Formik>
              )}
            </>
          ),
        }[mode]
      }
    </Account>
  );
};
