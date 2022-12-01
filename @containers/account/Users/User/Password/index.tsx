// Core
import { Fragment } from "react";
import dynamic from "next/dynamic";

// Core types
import type { FC } from "react";

// Global components
import { Divider, Heading } from "@components";

// Global form component
import { Field } from "@components/Form/Field";

// Icon Interface
import { Icon, TAccountPageModesList } from "@types";

// Global icons
const SettingsIcon = dynamic<Icon>(
  () => import("@icons").then((mod) => mod.SettingsIcon),
  {
    ssr: false,
  }
);

// Local container imports
import type { IUserFields } from "..";

// Vendors
import styled, { css } from "styled-components";
import { useFormikContext } from "formik";

// Global styles
import { Toggle } from "@styles/Form/Toggle";

const Fieldgroup = styled(Divider)`
  flex-direction: column;
  ${({ theme: { defaults, spaces, colors, font, ...theme } }) => css`
    margin-bottom: ${(spaces[3] as number) / 1.25}rem;
  `}
`;

interface Password {
  mode: TAccountPageModesList;
}

const index: FC<Password> = ({ mode }) => {
  const { values, setFieldValue } = useFormikContext<IUserFields>();

  return (
    <Divider
      $direction="column"
      $margin={values["role"] === "user" ? { bottom: 2 } : {}}
      $options={{
        additionalStyles: ({ colors }) => `
          border-bottom: 1px solid ${colors["border"]};
        `,
      }}
    >
      <Heading
        onClick={() =>
          mode === "update" &&
          // Toggle password validation
          setFieldValue("hasNewPassword", !values["hasNewPassword"])
        }
        $as="h5"
        $margin={{ top: 2, bottom: 2 }}
        $options={{
          additionalStyles: ({ colors, spaces }) => `
            display: flex;
            ${mode === "update" && "cursor: pointer;"}
            align-items: center;
            color: ${colors["primary"]};
            svg {
              margin-right: ${(spaces[1] as number) / 2}rem;
            }
          `,
        }}
      >
        {
          {
            add: (
              <Fragment>
                <SettingsIcon $size={30} $color="primary" />

                <Divider
                  $options={{
                    additionalStyles: ({ spaces }) => `
                      padding-left: ${spaces[1] as number}rem;
                    `,
                  }}
                >
                  Password
                </Divider>
              </Fragment>
            ),
            update: (
              <Fragment>
                <Toggle checked={values["hasNewPassword"]} />

                <Divider
                  $options={{
                    additionalStyles: ({ spaces }) => `
                      padding-left: ${(spaces[1] as number) * 1.5}rem;
                    `,
                  }}
                >
                  Change password
                </Divider>
              </Fragment>
            ),
          }[mode]
        }
      </Heading>

      <Divider
        $options={{
          additionalStyles: () => `
              flex-wrap: wrap;
              width: 100%;
            `,
        }}
      >
        {
          {
            add: (
              <Fieldgroup
                $options={{
                  additionalStyles: () => `flex: 0 0 100%;`,
                }}
              >
                <Field
                  $variant="static"
                  label="Password"
                  placeholder="******"
                  type="password"
                  name="password"
                />
              </Fieldgroup>
            ),
            update: values["hasNewPassword"] && (
              <Fieldgroup
                $options={{
                  additionalStyles: () => `flex: 0 0 100%;`,
                }}
              >
                <Field
                  $variant="static"
                  label="New password"
                  type="password"
                  placeholder="******"
                  name="newPassword"
                />
              </Fieldgroup>
            ),
          }[mode]
        }
      </Divider>
    </Divider>
  );
};

export { index as Password };
