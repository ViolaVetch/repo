// Core
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

// Vendors
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, type FormikHelpers } from "formik";
import mongoose from "mongoose";

// Local components
import { Page } from "./Page";
import { Wallets } from "./Wallets";

// Careful: Imported from different containers
import { Informations } from "@containers/account/Users/User/Informations";
import { Password } from "@containers/account/Users/User/Password";

// Global components
import { Divider, Loader, Button, Errors, Empty } from "@components";
import { Account } from "@components/Layouts";
import { Header } from "@components/Account";

// Global types
import type { IAccountPageModes, TAccountPageModesList, User } from "@types";

// Global methods
import { getItems } from "@methods/getItems";
import { putItems } from "@methods/putItems";
import { postItems } from "@methods/postItems";

// Global utils
import { isObjectEmpty } from "@utils/shared";

export interface IResellerFields extends User {
  hasNewPassword?: boolean;
  mode: TAccountPageModesList;
  submitted?: boolean;
}

export const Reseller = ({ mode, setMode }: IAccountPageModes) => {
  const dispatch = useDispatch();

  // Store loader
  const [loading, setLoading] = useState(true);

  // Store loader
  const [notFound, setNotFound] = useState(false);
  const notFoundMemo = useMemo(() => notFound, [notFound]);

  // Default (Real initial values)
  const defaultValues: IResellerFields = {
    _id: new mongoose.Types.ObjectId(),
    firstName: "",
    lastName: "",
    password: "",
    store: "",
    slug: "",
    email: "",
    role: "reseller",
    active: true,
    percentage: 0,
    createdAt: new Date(),
    // Beyond extending user interface
    hasNewPassword: true,
    mode,
    submitted: false,
  };

  const [initialValues, setInitialValues] = useState<IResellerFields | null>(
    null
  );
  const initialValuesMemo = useMemo(() => initialValues, [initialValues]);

  // Handle route changing
  const {
    query: { id },
    push,
  } = useRouter();

  useEffect(() => {
    // Check if we're at the edit page
    if (initialValues === null)
      if (mode === "update") {
        getItems<User>({
          model: "resellers",
          query: { _id: id },
          onSuccess: ({ data }) => {
            const [item] = data.items;

            if (data["items"].length > 0)
              // Store new data
              setInitialValues({
                ...item,
                hasNewPassword: false,
                mode: "update",
                submitted: false,
              });
          },
          onError: () => setNotFound(true),
          timeout: 200,
          setLoading,
          dispatch,
        });
      } else {
        setLoading(false);
      }
  }, [initialValuesMemo]);

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
      <Divider
        $options={{
          additionalStyles: () => `
            width: 100%;
            form {
              width: 100%;
            }
          `,
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          <Formik
            initialValues={
              initialValuesMemo === null
                ? { ...defaultValues, mode }
                : { ...initialValuesMemo, mode }
            }
            validationSchema={() =>
              Yup.lazy((values: IResellerFields) => {
                const defaultSchema = {
                  firstName: Yup.string().required("Please enter a first name"),
                  lastName: Yup.string().required("Please enter a last name"),
                  wallets: Yup.array()
                    .of(
                      Yup.object().shape({
                        currency: Yup.object().required(
                          "Please select currency"
                        ),
                        addr: Yup.string().required("Please enter an address"),
                      })
                    )
                    .compact(),
                  email: Yup.string()
                    .email("Please a valid e-mail address")
                    .required("Please an email"),
                };

                // Check if password should be modified
                if (values["hasNewPassword"] && mode === "update")
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
                return Yup.object().shape(defaultSchema);
              })
            }
            onSubmit={async (
              data: IResellerFields,
              { setSubmitting }: FormikHelpers<IResellerFields>
            ) => {
              switch (mode) {
                case "update":
                  putItems({
                    model: "users",
                    target: data._id,
                    data,
                    setLoading,
                    dispatch,
                    timeout: 200,
                    onSuccess: () => {
                      console.log(data)
                      
                      // Store updated user
                      setInitialValues({
                        ...data,
                        submitted: false,
                      });

                      // Disable submitting
                      setSubmitting(false);
                    },
                  });
                  break;
                case "add":
                  postItems({
                    data,
                    model: "users",
                    dispatch,
                    setLoading,
                    timeout: 100,
                    onSuccess: ({ data }) => {
                      // Grab first found item
                      const [item] = data.items;

                      // Store new user
                      setInitialValues({
                        ...item,
                        submitted: false,
                      });

                      // Change editing mode
                      setMode("update");

                      // Move route
                      push(`/account/resellers/${item["_id"]}`);
                    },
                  });
                  break;
              }
            }}
          >
            {({ values, errors, setFieldValue, submitForm }) => (
              <>
                <Divider
                  $direction="column"
                  $options={{
                    additionalStyles: () => `
                                width: 100%;
                              `,
                  }}
                >
                  {/* Aha */}
                  {!isObjectEmpty(errors) && values["submitted"] && (
                    <Errors {...errors} />
                  )}

                  <Header
                    $title={
                      mode == "update"
                        ? `Editing ${values["firstName"]} ${values["lastName"]}`
                        : `Create reseller`
                    }
                  >
                    <Button
                      $variant="primary"
                      $style="outline"
                      type="button"
                      onClick={() => push(`/account/resellers`)}
                      icon={{
                        $icon: "arrow-left",
                        $size: 20,
                      }}
                    >
                      Back
                    </Button>

                    <Divider
                      $margin={{
                        xs: { top: 1 },
                        sm: { top: 1 },
                        md: { top: 0, left: 2 },
                      }}
                    >
                      <Button
                        icon={{
                          $icon: mode === "add" ? "plus" : "save",
                          $size: 20,
                          $color: "white",
                        }}
                        type="button"
                        onClick={() => {
                          // Activate submitted form
                          setFieldValue("submitted", true);
                          // Submit form
                          submitForm();
                        }}
                        $variant="primary"
                      >
                        {mode === "update" ? "Save changes" : "Create"}
                      </Button>
                    </Divider>
                  </Header>

                  {/* Form */}
                  <Form autoComplete="off">
                    <Divider $direction="column">
                      {/* Informations */}
                      <Informations $isReseller />

                      {/* Update password */}
                      <Password {...{ mode }} />

                      {/* Page */}
                      <Wallets />

                      {/* Page */}
                      <Page />
                    </Divider>
                  </Form>
                </Divider>
              </>
            )}
          </Formik>
        )}
      </Divider>
    </Account>
  );
};
