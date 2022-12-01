// Core
import { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

// Vendors
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, type FormikHelpers } from "formik";
import mongoose, { ObjectId } from "mongoose";

// Local components for Reseller
import { Page } from "@containers/account/Resellers/Reseller/Page";
import { Wallets } from "@containers/account/Resellers/Reseller/Wallets";

// Local components for User
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

// Global utils
import { isObjectEmpty } from "@utils/shared";
import { useSession } from "next-auth/react";
import { Buttons } from "../Users/User/Buttons";

export interface IResellerFields extends User {
  hasNewPassword?: boolean;
  mode: TAccountPageModesList;
  submitted?: boolean;
}

export const Profile = ({ mode, setMode }: IAccountPageModes) => {
  const dispatch = useDispatch();

  // Get logged in user
  const { data: session } = useSession();

  // Store loader
  const [loading, setLoading] = useState(true);

  // Store loader
  const [notFound, setNotFound] = useState(false);
  const notFoundMemo = useMemo(() => notFound, [notFound]);

  const { push } = useRouter();

  const [initialValues, setInitialValues] = useState<IResellerFields | null>(
    null
  );
  const initialValuesMemo = useMemo(() => initialValues, [initialValues]);

  useEffect(() => {
    // Check if we're at the edit page
    if (initialValues === null)
      getItems<User>({
        model: session?.user.role === "reseller" ? "resellers" : "users",
        query: {
          _id: (session?.user._id as mongoose.Types.ObjectId).toString(),
        },
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
          initialValuesMemo && (
            <Formik
              initialValues={{ ...initialValuesMemo }}
              validationSchema={() =>
                Yup.lazy((values: IResellerFields) => {
                  const defaultSchema = {
                    firstName: Yup.string().required(
                      "Please enter a first name"
                    ),
                    lastName: Yup.string().required("Please enter a last name"),
                    email: Yup.string()
                      .email("Please a valid e-mail address")
                      .required("Please an email"),
                  };

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
                  return Yup.object().shape(defaultSchema);
                })
              }
              onSubmit={async (
                data: IResellerFields,
                { setSubmitting }: FormikHelpers<IResellerFields>
              ) =>
                putItems({
                  model: "users",
                  target: data._id,
                  data,
                  setLoading,
                  dispatch,
                  timeout: 200,
                  onSuccess: () => {
                    // Store updated user
                    setInitialValues({
                      ...data,
                      submitted: false,
                    });

                    // Disable submitting
                    setSubmitting(false);
                  },
                })
              }
            >
              {({ values, errors }) => (
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

                    <Header $title="Profile" />

                    {/* Form */}
                    <Form autoComplete="off">
                      <Divider $direction="column">
                        {/* Informations */}
                        <Informations
                          $isReseller={session?.user.role === "reseller"}
                        />

                        {/* Update password */}
                        <Password mode="update" />

                        {session?.user.role === "reseller" && (
                          <Fragment>
                            {/* Wallets */}
                            <Wallets />

                            {/* Page */}
                            <Page />
                          </Fragment>
                        )}

                        <Divider $margin={{ top: 2 }}>
                          <Buttons />
                        </Divider>
                      </Divider>
                    </Form>
                  </Divider>
                </>
              )}
            </Formik>
          )
        )}
      </Divider>
    </Account>
  );
};
