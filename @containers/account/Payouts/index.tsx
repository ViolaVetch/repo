// Core
import { type FC, useEffect, createContext, useState, useMemo } from "react";

// Vendors
import { useSession } from "next-auth/react";
import styled, { css } from "styled-components";

// Global components
import { Divider, Heading } from "@components";
import { Account } from "@components/Layouts";

// Local components
import { Balances } from "./Balances";
import { Table } from "./Table";

// Create Context base
export interface IPayoutsContext {
  loading: boolean;
  setLoading: (a: boolean) => void;
}
export const PayoutsContext = createContext({} as IPayoutsContext);

export const Payouts = () => {
  // User authentication
  const { data: session } = useSession();

  // Handle payouts wide loader
  const [loading, setLoading] = useState<boolean>(false);
  const loadingMemo = useMemo(() => loading, [loading]);

  return (
    <Account>
      <PayoutsContext.Provider value={{ loading: loadingMemo, setLoading }}>
        <Divider
          $direction="column"
          $options={{ additionalStyles: () => `width: 100%;` }}
        >
          {session?.user.role == "reseller" && <Balances />}

          <Table />
        </Divider>
      </PayoutsContext.Provider>
    </Account>
  );
};
