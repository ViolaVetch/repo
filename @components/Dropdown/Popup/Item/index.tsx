// Core types
import type { FC } from "react";

// Core
import { useContext, useState } from "react";

// Global components
import { Divider } from "@components";

// Vendors
import styled, { css } from "styled-components";

// Local context
import { DropdownContext } from "@components/Dropdown";
import { SuccessIcon } from "@icons";

const Check = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border-width: 1px;
  border-style: solid;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  svg {
    position: absolute;
    top: -1px;
    left: -1px;
  }
`;

const Item = styled(Divider)<{ $isActive: boolean }>`
  cursor: pointer;

  ${({ $isActive, theme: { defaults, colors, font, ...theme } }) => css`
    color: ${colors[$isActive ? "primary" : "grey"]};

    &:not(:last-of-type) {
      border-bottom: 1px solid ${colors["border"]};
    }

    // Handle check
    ${Check} {
      ${$isActive
        ? `
          border-color: ${colors["primary"]};
        `
        : `
          border-color: ${colors["border"]};
        `}
    }
  `}
`;

interface Item {}

const index: FC<{ value: string; label: string }> = (item) => {
  // Destructure current item
  const { label, value } = item;

  // Check selected items
  const { selectedItems, addItem, removeItem } = useContext(DropdownContext);

  const isSelected = Boolean(
    selectedItems?.filter((e) => e.value == value).length
  );

  return (
    <Item
      onClick={() => {
        if (!isSelected) addItem(item);
        else removeItem(item);
        // Handle pushing contact to Dropdown state
      }}
      $alignItems="center"
      $isActive={isSelected}
      $options={{
        additionalStyles: ({ spaces }) => `
          padding: ${(spaces[1] as number) * 1.25}rem;
        `,
      }}
    >
      <Check>
        {isSelected && <SuccessIcon $color="secondary" $size={22} />}
      </Check>
      <Divider $margin={{ left: 1 }}>{label}</Divider>
    </Item>
  );
};

export { index as Item };
