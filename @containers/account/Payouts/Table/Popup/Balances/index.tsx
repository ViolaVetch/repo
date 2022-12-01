// Core types
import { type FC } from "react";

// Global types
import type { ICurrency, IPayoutBalance, User } from "@types";

// Local components
import { Balance } from "./Balance";

// Global components
import { Divider } from "@components";

interface Balances {
  $items: IPayoutBalance[];
  $owner: User;
}

const index: FC<Balances> = ({ $items, $owner }) => {
  return (
    <Divider $direction="column" $margin={{ top: 2, bottom: 2 }}>
      {$items.map((balance) => (
        <Balance
          {...balance}
          key={(balance.wallet.currency as ICurrency)._id.toString()}
        />
      ))}
    </Divider>
  );
};

export { index as Balances };
