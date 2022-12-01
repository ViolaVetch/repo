// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Global components
import { Divider, Icon } from "@components";

const IconContainer = styled(Divider)`
  width: 62px;
  height: 62px;
  flex: 0 0 62px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;

  ${({ theme: { colors } }) => css`
    background-color: ${colors["border"]};
  `}
`;

const Content = styled(Divider)`
  flex: 1;
  flex-direction: column;

  ${({ theme: { spaces } }) => css`
    padding: ${spaces[1] as number}rem;
  `}
`;

// Global types
import { IStat, TIconsList } from "@types";
import { formatCurrency } from "@utils/shared";

interface Box extends IStat {}

const index: FC<Box> = ({ type, label, quantity }) => {
  const getIcon = (): TIconsList => {
    switch (type) {
      case "orders-total":
        return "analytics-orders";
      case "revenue-total":
        return "analytics-revenue";
      case "orders-total-confirmed":
        return "analytics-completed";
      case "products-total":
        return "analytics-inventory";
      case "resellers-total":
        return "analytics-user";
      case "profit-total":
        return "analytics-balance";
      default:
        return "analytics";
    }
  };

  const Quantity: FC = () => {
    switch (type) {
      case "revenue-total":
      case "profit-total":
        return (
          <Divider
            $options={{
              additionalStyles: () => `
                font-size: 20px;
                margin-bottom: 4px;
              `,
            }}
          >
            {formatCurrency({ amount: quantity.toString() })}
          </Divider>
        );

      default:
        return (
          <Divider
            $options={{
              additionalStyles: () => `
                font-size: 17px;
                font-weight: 700;
              `,
            }}
          >
            {quantity}
          </Divider>
        );
    }
  };

  return (
    <Divider
      $alignItems="center"
      $options={{
        additionalStyles: ({ spaces, colors, breakpoints }) => `
          width: 100%;
          border-radius: 24px;
          display: flex;
          padding: ${(spaces[1] as number) * 1.5}rem;
          flex: 0 0 calc(33.33333% - ${((spaces[2] as number) * 2) / 3}rem);
          margin-bottom: ${spaces[2]}rem;
          background-color: ${colors["border"]};

          @media (max-width: ${breakpoints["lg"]}px) {
            flex: 0 0 calc(50% - ${((spaces[2] as number) * 2) / 3}rem);

            &:not(:nth-of-type(2n)) {
              margin-right: ${spaces[2]}rem;
            }
          }

          @media (min-width: ${breakpoints["lg"]}px) {
            &:not(:nth-of-type(3n)) {
              margin-right: ${spaces[2]}rem;
            }
          }
        `,
      }}
    >
      <IconContainer>
        <Icon $icon={getIcon()} $size={60} />
      </IconContainer>
      <Content>
        <Quantity />
        <Divider
          $options={{
            additionalStyles: () => `
              opacity: 0.60;
              font-size: 14px;
            `,
          }}
        >
          {label}
        </Divider>
      </Content>
    </Divider>
  );
};

export { index as Box };
