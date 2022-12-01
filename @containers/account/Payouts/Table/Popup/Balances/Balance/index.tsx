// Core types
import { type FC } from "react";

// Global types
import type { ICurrency, IPayoutBalance } from "@types";

// Vendors
import { Divider } from "@components";

const index: FC<IPayoutBalance> = ({ wallet, amount }) => {
  return (
    <Divider
      $alignItems="flex-start"
      $direction="column"
      $options={{
        additionalStyles: ({ spaces, colors }) => `
          padding-top: ${spaces[1] as number}rem;
          padding-bottom: ${spaces[1] as number}rem;
          &:not(:last-of-type) {
            border-bottom: 1px solid ${colors["border"]};
            margin-bottom: ${(spaces[1] as number) / 2}rem;
          }
        `,
      }}
    >
      {amount.toFixed(5)} {(wallet.currency as ICurrency).symbol}
      {wallet ? (
        <Divider
          $options={{
            additionalStyles: ({ spaces, colors }) => `
              padding: ${(spaces[1] as number) / 1}rem;
              margin-top: ${(spaces[1] as number) / 2}rem;
              width: auto;
              border-radius: 12px;
              background-color: ${colors["border"]};
            `,
          }}
        >
          Wallet: {wallet["addr"]}
        </Divider>
      ) : (
        "Something went wrong"
      )}
    </Divider>
  );
};

export { index as Balance };
