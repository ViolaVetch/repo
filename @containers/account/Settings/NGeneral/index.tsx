// Core types
import type { FC } from "react";

// Global components
import { Divider, Heading } from "@components";

// Global form component
import { Field } from "@components/Form/Field";

// Global icons
import { BuyNowIcon } from "@icons";

// Vendors
import styled, { css } from "styled-components";

const Fieldgroup = styled(Divider)`
  flex-direction: column;
  ${({ theme: { breakpoints, spaces, colors, font, ...theme } }) => css`
    margin-bottom: ${(spaces[3] as number) / 1.25}rem;
    @media (max-width: ${breakpoints["md"]}px) {
      flex: 0 0 100%;
    }
  `}
`;

interface Password {}

const index: FC<Password> = () => {
  return (
    <Divider
      $direction="column"
      $padding={{ bottom: 2 }}
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
        <BuyNowIcon $size={30} />
        General
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
            label="Company name*"
            type="text"
            placeholder="e.g. CryptoPon"
            name="companyName"
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
            label="Contact email*"
            type="text"
            placeholder="Contact Email"
            name="contactEmail"
          />
        </Fieldgroup>

        <Fieldgroup
          $options={{
            additionalStyles: () => `flex: 0 0 50%;`,
          }}
        >
          <Field
            $variant="static"
            label="Website title*"
            type="textarea"
            name="websiteTitle"
          />
        </Fieldgroup>

        <Fieldgroup
          $padding={{ md: { left: 2 } }}
          $options={{
            additionalStyles: () => `flex: 0 0 50%;`,
          }}
        >
          <Field
            $variant="static"
            label="Website description*"
            type="textarea"
            name="websiteDescription"
          />
        </Fieldgroup>
      </Divider>
    </Divider>
  );
};

export { index as NGeneral };
