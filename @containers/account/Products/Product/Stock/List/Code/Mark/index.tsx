// Core
import { type FC, useState, useRef, useEffect } from "react";

// Vendors
import styled, { css } from "styled-components";
import { useFormikContext } from "formik";

// Local types
import { type IProductStockFields } from "@containers/account/Products/Product/Stock";

// Global components
import { Divider } from "@components";
import mongoose from "mongoose";

// Local utils
import { getColorByStatus } from "@containers/account/Products/Product/Stock/List";
import { TCodeStatus } from "@types";

const Item: FC<{
  $label: string;
  $onClick: () => void;
  $status: TCodeStatus;
}> = ({ $label, $status, $onClick }) => {
  // Get color by status
  const color = getColorByStatus($status);

  return (
    <Divider
      onClick={$onClick}
      $alignItems="center"
      $options={{
        additionalStyles: ({ colors, spaces, font }) => `
          font-size: 14px;
          padding: ${(spaces[1] as number) / 2}rem;
          width: 100%;
          cursor: pointer;
          border-bottom: 1px solid ${colors["border"]};
          
          &:not(:last-of-type) {
            margin-bottom: ${spaces[1]}rem;
          }

          &:hover {
            font-weight: ${font["weight"]["semiBold"]};
            border-color: ${colors["secondary"]}50;
          }
        `,
      }}
    >
      <Divider
        $options={{
          additionalStyles: ({ colors, spaces }) => `
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: ${colors[color]};
            margin-right: ${(spaces[1] as number) / 1.5}rem;
          `,
        }}
      />
      {$label}
    </Divider>
  );
};

interface Mark {
  $id: mongoose.Types.ObjectId;
}

const index: FC<Mark> = ({ $id }) => {
  // Core of the form
  const { values, setFieldValue } = useFormikContext<IProductStockFields>();

  // Find index of the current code
  const index = values["codes"].findIndex((el) => el["_id"] === $id);

  // Find current code object
  const current = values["codes"][index];

  const [isOpen, setIsOpen] = useState(false);

  // Handle ref
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [,]);

  const handleClickOutside = (event: { target: any }) => {
    if (ref.current && !ref.current?.contains(event.target)) {
      setIsOpen(false);
    }
  };

  return (
    <Divider ref={ref} $alignItems="center">
      <Divider
        $alignItems="center"
        $options={{
          additionalStyles: ({ defaults, spaces, colors }) => `
            user-select: none;
            font-size: 14px;
            cursor: pointer;
            padding:  ${(spaces[1] as number) / 1.5}rem ${spaces[1]}rem;
            border-radius: ${defaults["radius"] * 3}px;
            border: 1px solid ${colors["secondary"]}10;
            background-color: ${colors["secondary"]}10;
            color: ${colors["secondary"]};

            &:active {
              transform: scale(0.975);
            }
            
            svg {
              margin-top: 3px;
              margin-left: ${(spaces[1] as number) / 2}rem;
            }
          `,
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        Mark as
        <svg xmlns="http://www.w3.org/2000/svg" width="13" viewBox="0 0 13 8">
          <path
            d="M1064.043,413.352a.747.747,0,0,1-.53-.22l-5.1-5.1a.75.75,0,1,1,1.061-1.061l4.572,4.572,4.572-4.572a.75.75,0,0,1,1.061,1.061l-5.1,5.1A.748.748,0,0,1,1064.043,413.352Z"
            transform="translate(-1058.19 -406.75)"
          />
        </svg>
      </Divider>

      {isOpen && (
        <Divider
          $direction="column"
          $options={{
            additionalStyles: ({ colors, spaces }) => `
              position: absolute;
              padding: ${spaces[2]}rem;
              right: 0;
              top: 100%;
              min-width: 150px;
              border-radius: 18px;
              background-color: ${colors["white"]};
              box-shadow: 0 0 25px rgba(0,0,0,.05);

              &:before {
                content: "";
                position: absolute;
                top: -9px;
                pointer-events: none;
                right: 18px;
                width: 0; 
                height: 0; 
                border-left: 9px solid transparent;
                border-right: 9px solid transparent;
                border-bottom: 9px solid ${colors["white"]};
              }
            `,
          }}
        >
          <Item
            $status={0}
            $label="Available"
            $onClick={() => setFieldValue(`codes[${index}].status`, 0)}
          />
          <Item
            $status={1}
            $label="Sold"
            $onClick={() => setFieldValue(`codes[${index}].status`, 1)}
          />
          <Item
            $status={2}
            $label="Pending"
            $onClick={() => setFieldValue(`codes[${index}].status`, 2)}
          />
          <Item
            $status={3}
            $label="Failed"
            $onClick={() => setFieldValue(`codes[${index}].status`, 3)}
          />
          <Item
            $status={4}
            $label="Replacement"
            $onClick={() => setFieldValue(`codes[${index}].status`, 4)}
          />
          <Item
            $status={5}
            $label="Unfulfilled"
            $onClick={() => setFieldValue(`codes[${index}].status`, 5)}
          />
        </Divider>
      )}
    </Divider>
  );
};

export { index as Mark };
