// Core types
import type { FC } from "react";

// Global components
import { Divider, Heading, Number } from "@components";

// Global form component
import { Field } from "@components/Form/Field";

// Global icons
import { UserIcon } from "@icons";

// Local container imports
import type { IUserFields } from "..";

// Vendors
import styled, { css } from "styled-components";
import { useFormikContext } from "formik";

const Fieldgroup = styled(Divider)`
  flex-direction: column;
  ${({ theme: { breakpoints, spaces, colors, font, ...theme } }) => css`
    margin-bottom: ${(spaces[3] as number) / 1.25}rem;
    @media (max-width: ${breakpoints["md"]}px) {
      flex: 0 0 100%;
    }
  `}
`;

interface Password {
  $isReseller: boolean;
}

const index: FC<Password> = ({ $isReseller }) => {
  const { values, setFieldValue } = useFormikContext<IUserFields>();

  return (
    <Divider
      $direction="column"
      $options={{
        additionalStyles: ({ colors }) => `
          border-bottom: 1px solid ${colors["border"]};
        `,
      }}
    >
      <Heading
        $as="h5"
        $margin={{ bottom: 3 }}
        $options={{
          additionalStyles: ({ colors, spaces }) => `
            display: flex;
            align-items: center;
            color: ${colors["primary"]};
            svg {
              margin-right: ${(spaces[1] as number) / 2}rem;
            }
          `,
        }}
      >
        <UserIcon $size={30} />
        Informations
      </Heading>

      <Divider
        $options={{
          additionalStyles: () => `
            flex-wrap: wrap;
            width: 100%;
          `,
        }}
      >
        <Fieldgroup
          $options={{
            additionalStyles: () => `
              z-index: 5;
              flex: 0 0 50%;
            `,
          }}
        >
          <Field
            $variant="static"
            label="First name*"
            type="text"
            placeholder="John"
            name="firstName"
          />
        </Fieldgroup>

        <Fieldgroup
          $padding={{ md: { left: 2 } }}
          $options={{
            additionalStyles: ({ spaces }) => `z-index: 5; flex: 0 0 50%;`,
          }}
        >
          <Field
            $variant="static"
            label="Last name*"
            type="text"
            placeholder="Doe"
            name="lastName"
          />
        </Fieldgroup>

        <Fieldgroup
          $options={{
            additionalStyles: () => `flex: 0 0 50%;`,
          }}
        >
          <Field
            $variant="static"
            label="E-mail address*"
            placeholder="john.doe@example.com"
            type="email"
            name="email"
          />
        </Fieldgroup>

        {$isReseller && (
          <Fieldgroup
            $padding={{ md: { left: 2 } }}
            $options={{
              additionalStyles: ({ spaces, breakpoints }) => `flex: 0 0 50%;`,
            }}
          >
            <Field
              $variant="static"
              label="Reseller status*"
              type="toggle"
              name="active"
              toggle={(status) =>
                values["mode"] === "update"
                  ? `Reseller is ${status ? "active" : "inactive"}`
                  : ` ${status ? "Active" : "Inactive"}`
              }
            />
          </Fieldgroup>
        )}

        {$isReseller && (
          <Fieldgroup
            $options={{
              additionalStyles: () => `flex: 0 0 50%;`,
            }}
          >
            <Field
              $variant="static"
              label="Seller name*"
              placeholder="Example.com"
              type="text"
              name="store"
            />
          </Fieldgroup>
        )}

        {$isReseller && (
          <Fieldgroup
            $padding={{ md: { left: 2 } }}
            $options={{
              additionalStyles: () => `flex: 0 0 50%;`,
            }}
          >
            <Number
              $label="Sale percentage *"
              $value={values["percentage"]}
              $max={100}
              $min={0}
              onUpdate={(value) => {
                setFieldValue("percentage", value ? value : 0);
              }}
            />
          </Fieldgroup>
        )}
      </Divider>
    </Divider>
  );
};

export { index as Informations };
