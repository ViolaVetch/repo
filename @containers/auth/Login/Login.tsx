// Vendors
import styled, { css } from "styled-components";
import { FormikHelpers } from "formik";
import { signIn, useSession } from "next-auth/react";

// Core
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

// Global components
import { Divider, Logo, Form, Heading, Icon } from "@components";

const Paragraph = styled.div`
  ${({ theme: { colors } }) => css`
    span {
      color: ${colors["primary"]};
    }
  `}
`;

export interface IAuthenticationFields {
  email: string;
  password: string;
}

const Login: any = () => {
  // Router
  const router = useRouter();

  // Next-Auth Authentication
  const { data: session } = useSession();

  // Manage errors
  const [Error, setError] = useState<string | null>(null);

  // Manage errors
  const [Mode, setMode] = useState<"login" | "resetPassword">("login");

  const initialValues: IAuthenticationFields = {
    email: "",
    password: "",
  };

  return (
    <Divider $direction="column" $margin={{ top: "auto", bottom: "auto" }}>
      <Divider
        $justifyContent="center"
        $padding={2}
        $background={{ color: "primary" }}
        $options={{
          additionalStyles: ({ defaults }) => `
            border-radius: ${defaults.radius}px;
          `,
        }}
      >
        <Logo />
      </Divider>

      <Divider $direction="column" $padding={{ top: 3, bottom: 3 }}>
        {["resetPassword"].includes(Mode) && (
          <Divider
            $extends="button"
            onClick={() => setMode("login")}
            $margin={{ bottom: 2 }}
            $options={{
              additionalStyles: ({ colors, spaces }) => `
                transform-origin: center left;
              `,
            }}
          >
            <Icon $icon="arrow-left" $size={20} />
            <Divider
              $options={{
                additionalStyles: ({ colors, spaces }) => `
                  margin-left: ${(spaces[1] as number) / 2}rem;
                  color: ${colors["primary"]};
                `,
              }}
            >
              Login
            </Divider>
          </Divider>
        )}

        <Heading $as="h4">
          {
            {
              login: "Sign-in",
              resetPassword: "Reset your password",
            }[Mode]
          }
        </Heading>

        <Paragraph>
          {
            {
              login: (
                <Fragment>
                  Please fill out the form below to sign-in and manage your
                  account.
                </Fragment>
              ),
              resetPassword: (
                <Fragment>
                  To reset your password, submit your email below and you will
                  receive instructions how to proceed.
                </Fragment>
              ),
            }[Mode]
          }
        </Paragraph>

        {Error && (
          <Divider
            $background={{
              color: "danger",
            }}
            $options={{
              additionalStyles: ({ defaults, spaces, colors }) => `
              color: ${colors["white"]};
              padding: ${spaces[1]}rem ${spaces[2]}rem;
              border-radius: ${defaults["radius"]}px;
              margin-top: ${spaces[3]}rem;
            `,
            }}
          >
            Something went wrong, please re-check your credentials and try
            again.
          </Divider>
        )}
      </Divider>

      {
        {
          login: (
            <Form
              autoComplete="off"
              initialValues={initialValues}
              onSubmit={async (
                values: IAuthenticationFields,
                { setSubmitting }: FormikHelpers<IAuthenticationFields>
              ) => {
                await signIn("credentials", {
                  email: values.email,
                  password: values.password,
                  redirect: false,
                }).then(({ error }: any) => {
                  if (error) {
                    // Alert error
                    setError("Authentication failed");
                    // Disable submitting
                    setTimeout(() => {
                      setSubmitting(false);
                    }, 500);
                  } else {
                    // Hide error if it was there previously
                    setError(null);
                    // Reroute user to the dashboard
                    router.push("/account");
                  }
                });
              }}
              button={{
                label: "Sign in",
                labelSubmitting: "Signing you in",
              }}
              fields={[
                {
                  label: "Your email address *",
                  name: "email",
                  type: "text",
                  validation: {
                    type: "string",
                    validations: [
                      {
                        type: "required",
                        params: ["This field is required"],
                      },
                    ],
                  },
                },
                {
                  label: "Password *",
                  name: "password",
                  type: "password",
                  // children: (
                  //   <Divider
                  //     onClick={() => {
                  //       // Show the form to reset the password
                  //       setMode("resetPassword");
                  //     }}
                  //     $extends="button"
                  //     $options={{
                  //       additionalStyles: ({ colors, spaces }) => `
                  //         font-size: 13px;
                  //         margin-top: ${spaces[1]}rem;
                  //         color: ${colors["primary"]};
                  //         transform-origin: center left;
                  //         transition: all 150ms ease-in-out;
                  //       `,
                  //     }}
                  //   >
                  //     Forgot your password?
                  //   </Divider>
                  // ),
                  validation: {
                    type: "string",
                    validations: [
                      {
                        type: "required",
                        params: ["This field is required"],
                      },
                    ],
                  },
                },
              ]}
            />
          ),
          resetPassword: (
            <Form
              autoComplete="off"
              initialValues={initialValues}
              onSubmit={async (
                values: IAuthenticationFields,
                { setSubmitting }: FormikHelpers<IAuthenticationFields>
              ) => {
                // Submit password reset
              }}
              button={{
                label: "Submit",
                labelSubmitting: "Submitting ...",
              }}
              fields={[
                {
                  label: "Your email address *",
                  name: "email",
                  type: "text",
                  validation: {
                    type: "string",
                    validations: [
                      {
                        type: "required",
                        params: ["This field is required"],
                      },
                    ],
                  },
                },
              ]}
            />
          ),
        }[Mode]
      }
    </Divider>
  );
};

export default Login;
