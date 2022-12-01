// Core types
import type { FC } from "react";

// Global components
import { Divider, Heading } from "@components";

// Global form component
import { Field } from "@components/Form/Field";

// Global icons
import { GiftIcon } from "@icons";

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

const index: FC = () => {
  return (
    <Divider
      $direction="column"
      $padding={{ top: 4, bottom: 2 }}
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
        <GiftIcon $size={30} />
        Social media links
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
            additionalStyles: () => `z-index: 5; flex: 0 0 100%;`,
          }}
        >
          <Field
            $variant="static"
            label="Telegram link"
            type="text"
            name="telegram"
          />
        </Fieldgroup>
      </Divider>
    </Divider>
  );
};

export { index as NSocialMedia };
