// Core types
import { IBalance, ICurrency, IPayoutBalance } from "@types";
import type { FC } from "react";

// Global components
import { Divider } from "@components";

interface Balances {
  $items: IPayoutBalance[];
}

const index: FC<Balances> = ({ $items }) => {
  return (
    <Divider $direction="column">
      {$items.map((el: IPayoutBalance) => (
        <Divider
          key={(el["wallet"]["currency"] as ICurrency)._id.toString()}
          $margin={{ right: 1 }}
        >
          <Divider
            $options={{
              additionalStyles: ({ spaces }) => `
                margin-right: ${(spaces["1"] as number) / 2}rem;
              `,
            }}
          >
            {el["amount"].toFixed(
              (el["wallet"]["currency"] as ICurrency).decimals
            )}
          </Divider>
          <Divider
            $options={{
              additionalStyles: ({ font }) => `
                font-weight: ${font["weight"]["semiBold"]}
              `,
            }}
          >
            {(el["wallet"]["currency"] as ICurrency).symbol}
          </Divider>
        </Divider>
      ))}
    </Divider>
  );
};

export { index as Balances };
