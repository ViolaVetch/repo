// Core
import { type FC } from "react";

// Global types
import { IAmount, ICurrency, User } from "@types";

// Vendors
import styled, { css } from "styled-components";

// Global components
import { Divider } from "@components";
import { Payment } from "@icons";

const Label = styled.div`
  ${({ theme: { font, spaces } }) => css`
    font-weight: ${font["weight"]["semiBold"]};
    margin-bottom: ${(spaces[1] as number) / 2}rem; ;
  `}
`;

interface Amount extends IAmount {}

const index: FC<Amount> = ({ owner, currency, amount, paid }) => {
  let curr: ICurrency = currency as ICurrency;
  let own: User = owner as User;

  return (
    <Divider
      $alignItems="center"
      $options={{
        additionalStyles: ({ colors, spaces, defaults }) => `
          background-color: ${colors["border"]}90;
          border-radius: ${defaults["radius"]}px;
          padding: ${spaces[1]}rem
        `,
      }}
    >
      {/* Icon */}
      <Divider
        $options={{
          additionalStyles: ({ spaces }) => `
              margin-right: ${spaces[1]}rem;
              margin-left: ${spaces[1]}rem;
            `,
        }}
      >
        <Payment $color="primary" $size={40} />
      </Divider>

      <Divider
        $direction="column"
        $options={{
          additionalStyles: ({ spaces, defaults }) => `
              border-radius: ${defaults["radius"]}px;
              padding: ${spaces[1] as number}rem;
              margin-right: ${spaces[1]}rem;
            `,
        }}
      >
        <Label>Owner:</Label>
        {own["firstName"]} {own["lastName"]}{" "}
        {own["store"] && `(${own["store"]})`}
      </Divider>

      <Divider
        $direction="column"
        $options={{
          additionalStyles: ({ spaces }) => `
            margin-right: ${(spaces[1] as number) / 2}rem;
          `,
        }}
      >
        <Label>Amount:</Label>
        {`${amount.toFixed(curr["decimals"])} `}
        {curr["symbol"]}
      </Divider>
    </Divider>
  );
};

export { index as Amount };
