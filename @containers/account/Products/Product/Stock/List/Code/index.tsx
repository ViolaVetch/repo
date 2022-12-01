// Global components
import { Divider } from "@components";

// Core
import { FC } from "react";

// Vendors
import styled, { css } from "styled-components";
import { useFormikContext } from "formik";

// Global icons
import { DeleteIcon } from "@icons";

// Global types
import type { ICode } from "@types";

// Local types
import { type IProductStockFields } from "@containers/account/Products/Product/Stock";

// Local utils
import { getColorByStatus } from "@containers/account/Products/Product/Stock/List";

// Local components
import { Mark } from "./Mark";

const Field = styled.input`
  background-color: transparent;
  ${({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors["secondary"]};
  `}
`;

interface Item extends ICode {
  action: Function;
  index: number;
}

// Render item
export const Code: FC<Item> = ({ action, status, code, _id }) => {
  // Core of the form
  const { values, setFieldValue } = useFormikContext<IProductStockFields>();

  // Get color by status
  const color = getColorByStatus(status);

  // Find index of the current code
  const index = values["codes"].findIndex((el) => el["_id"] === _id);

  return (
    <Divider
      $alignItems="center"
      $margin={{ bottom: 1 }}
      $padding={{ top: 1, bottom: 1, left: 2 }}
      $options={{
        additionalStyles: ({ defaults, colors }) => `
          border-radius: ${defaults["radius"]}px;
          z-index: ${values["codes"].length - index};
          width: 100%;
          background-color: ${colors["border"]};
          word-break: break-all;
	      `,
      }}
    >
      {status === 5 ? (
        <Field
          value={values["codes"][index]["code"]}
          onChange={(e) =>
            setFieldValue(`codes[${index}].code`, e["target"]["value"])
          }
        />
      ) : (
        <Divider
          $options={{
            additionalStyles: () => `
              max-width: 75%;
            `,
          }}
        >
          {code}
        </Divider>
      )}

      <Divider
        $alignItems="center"
        $justifyContent="flex-end"
        $margin={{ left: "auto" }}
        $options={{
          additionalStyles: () => `
            min-width: 250px;
            
        `,
        }}
      >
        <Divider
          $options={{
            additionalStyles: ({ defaults, spaces, colors }) => `
              user-select: none;
              font-size: 14px;
              padding:  ${(spaces[1] as number) / 1.5}rem ${spaces[1]}rem;
              border-radius: ${defaults["radius"] * 3}px;
              border: 1px solid ${colors[color ? color : "grey"]}50;
              background-color: ${colors[color ? color : "grey"]}10;
              color: ${colors[color ? color : "grey"]};
            `,
          }}
        >
          {
            {
              0: "Available", // Available
              1: "Sold", // Sold
              2: "Pending", // Pending
              3: "Failed", // Failed
              4: "Replaced", // Replaced
              5: "To be fulfilled", // Awaiting fulfillment
            }[status]
          }
        </Divider>

        <Divider $margin={{ right: 2, left: 2 }}>
          <Mark $id={_id} />

          <Divider
            $options={{
              additionalStyles: ({ spaces }) => `
                cursor: pointer; 
                margin-left: ${spaces[1]}rem;
                &:active {
                  transform: scale(0.85);
                }
              `,
            }}
            onClick={() =>
              // Remove coupon
              action()
            }
          >
            <DeleteIcon $size={24} />
          </Divider>
        </Divider>
      </Divider>
    </Divider>
  );
};
