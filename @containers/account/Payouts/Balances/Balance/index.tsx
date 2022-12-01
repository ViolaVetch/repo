// Core types
import type { FC } from "react";

// Core
import { useState } from "react";

// Global types
import { IBalance } from "@types";

// Vendors
import styled, { css } from "styled-components";

// Global components
import { Divider } from "@components";

// Global icons
import { InfoIcon } from "@icons";

// Global styles
import { Popover } from "@styles";

const Balance = styled.div<{ $hasBalance: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0 0 220px;
  height: 90px;
  text-align: center;
  user-select: none;
  cursor: pointer;
  border: 1px solid transparent;

  ${({ theme: { defaults, colors, spaces } }) => css`
    border-radius: ${defaults["radius"]}px;
    background-color: ${colors["border"]};
    color: ${colors["secondary"]};
    margin-right: ${spaces[2]}rem;
    margin-bottom: ${spaces[2]}rem;
  `}

  ${({ $hasBalance, theme: { colors } }) =>
    !$hasBalance &&
    css`
      background-color: ${colors["border"]}50;
      color: ${colors["secondary"]}50;
      cursor: not-allowed;
    `}
`;

interface Balance extends IBalance {
  $withdraw: () => void;
}

const index: FC<Balance> = ({ currency, amount, isActive, $withdraw }) => {
  // Check if user interaction isn allowed
  const isDisabled = amount > 0 && !isActive;

  // Handle popover when amount is 0
  const [isOpen, setIsOpen] = useState(false);

  // Handle error when currency is disabled and amount is higher than > 0
  const Error: FC<{}> = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Divider
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        $options={{
          additionalStyles: () => `
            position: absolute;
            top: -10px;
            right: -10px;
            cursor: default;
          `,
        }}
      >
        {isOpen && <Popover>Please add a {currency.name} wallet</Popover>}
        <InfoIcon $outline $size={20} $color="danger" />
      </Divider>
    );
  };

  return (
    <Balance
      onMouseEnter={() => amount == 0 && setIsOpen(true)}
      onMouseLeave={() => amount == 0 && setIsOpen(false)}
      onClick={() => {
        if (amount > 0) !isDisabled && $withdraw();
      }}
      $hasBalance={amount > 0}
    >
      {isOpen && <Popover>Balance is empty</Popover>}

      {isDisabled && <Error />}

      <Divider
        $options={{
          additionalStyles: ({ font, spaces }) => `
            font-size: 17px;
            margin-bottom: ${(spaces["1"] as number) / 2}rem;
            font-weight: ${font["weight"]["semiBold"]};
          `,
        }}
      >
        {currency.name}
      </Divider>

      <Divider
        $options={{
          additionalStyles: ({ font, spaces }) => `
            font-size: 13px;
          `,
        }}
      >
        {amount.toFixed(currency.decimals ? currency.decimals : 5)}{" "}
        {currency.symbol}
      </Divider>
    </Balance>
  );
};

export { index as Balance };
