// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Global components
import { Labelium, Divider } from "@components";

// Global types
import type { IVariant } from "@types";

// Global icons
import { DeleteIcon } from "@icons";
import { Field } from "@components/Form";

const Variant = styled.div`
  display: flex;
  width: 100%;

  ${({ theme: { defaults, spaces, colors } }) => css`
    padding: ${spaces[2]}rem;
    background-color: ${colors["border"]};
    border-radius: ${defaults["radius"]}px;
    margin-bottom: ${spaces[2]}rem;

    input {
      background-color: ${colors["white"]};
    }
  `}
`;

const Currency = styled.span`
  position: absolute;
  left: 20px;
  bottom: calc(50% - 20px);
  z-index: 10;

  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    color: ${colors["grey"]};
  `}
`;

interface Props extends IVariant {
  index: number;
  remove: () => void;
}

const index: FC<Props> = ({ index, remove }) => {
  return (
    <Variant>
      <Divider
        $alignItems="center"
        $options={{ additionalStyles: () => `flex: 1;` }}
      >
        <Divider $options={{ flex: 1 }} $padding={{ right: 1 }}>
          <Field
            $variant="static"
            label="Name*"
            type="text"
            name={`variants[${index}].name`}
          />
        </Divider>

        <Divider
          $options={{
            flex: 1,
            additionalStyles: () => `
              input {
                padding-left: 35px;
              }
            `,
          }}
          $padding={{ right: 1 }}
        >
          <Currency>$</Currency>
          <Field
            $variant="static"
            label="Price*"
            type="text"
            name={`variants[${index}].price`}
          />
        </Divider>

        <Divider $options={{ flex: 1 }} $padding={{ right: 1 }}>
          <Field
            $variant="static"
            label="Min. quantity*"
            type="text"
            name={`variants[${index}].min`}
          />
        </Divider>

        <Divider $options={{ flex: 1 }}>
          <Field
            $variant="static"
            label="Max. quantity*"
            type="text"
            name={`variants[${index}].max`}
          />
        </Divider>

        <Divider
          $alignItems="center"
          $margin={{ sm: { left: 1 } }}
          onClick={() => remove()}
          $options={{ additionalStyles: () => `cursor: pointer;` }}
        >
          <DeleteIcon />
        </Divider>
      </Divider>
    </Variant>
  );
};

export { index as Variant };
