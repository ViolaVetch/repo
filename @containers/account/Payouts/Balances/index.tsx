// Core types
import type { FC } from "react";

// Core
import { useMemo, useEffect, useState } from "react";

// Vendors
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

// Global types
import { IBalance, ICurrency, User } from "@types";

// Local components
import { Balance } from "./Balance";
import { Withdrawal } from "./Withdrawal";

// Global components
import { Button, Heading } from "@components";
import { Divider } from "@components/Divider";

// Global styles
import { Animation, Popover } from "@styles";
import { getItems } from "@methods/getItems";
import { useSession } from "next-auth/react";

const Balances = styled(Divider)`
  display: flex;
  flex-wrap: wrap;
`;

const Container = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Loader: FC<{}> = () => {
  return (
    <Divider
      $options={{
        additionalStyles: () => `
          flex-wrap: wrap;
          width: 100%;
        `,
      }}
    >
      {Array.from(Array(9).keys()).map((el) => (
        <Animation
          key={el}
          $style={({ spaces }: any) => `
              flex: 0 0 220px;
              height: 90px;
              margin-right: ${spaces[2]}rem;
              margin-bottom: ${spaces[2]}rem;
              background-size: 900px 900px;
              animation-duration: 1.5s;
            `}
        />
      ))}
    </Divider>
  );
};

interface Balances {}

const index: FC<Balances> = () => {
  // Current reseller
  const { data: session } = useSession();

  // Handle site loader
  const [loading, setLoading] = useState(true);

  // Handle balances array
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState<boolean>(false);
  const isWithdrawalOpenMemo = useMemo(
    () => isWithdrawalOpen,
    [isWithdrawalOpen]
  );

  // Handle balances array
  const [balances, setBalances] = useState<IBalance[]>([]);
  const balancesMemo = useMemo(() => balances, [balances]);

  // Redux
  const dispatch = useDispatch();

  const fetchBalances = () =>
    getItems<IBalance>({
      model: "balances",
      onSuccess: ({ data }) => {
        // If data exists
        setBalances(data["items"]);
      },
      setLoading,
      dispatch,
    });

  useEffect(() => {
    fetchBalances();
  }, []);

  // Total
  const total = balances?.reduce((prev, next) => prev + next.amount, 0);

  // Handle button popover visibility
  const [isButtonPopoverVisibilityOpen, setIsButtonPopoverVisibilityOpen] =
    useState(false);

  return (
    <Divider $direction="column">
      <Divider $margin={{ bottom: 3 }}>
        <Divider $direction="column">
          <Heading $as="h4">Balances</Heading>
          {session?.user["percentage"] && (
            <Heading
              $as="p"
              $options={{
                additionalStyles: ({ font }) => `
                  font-weight: ${font["weight"]["semiBold"]};
                `,
              }}
            >
              Current sale share:{" "}
              <Divider
                $options={{
                  additionalStyles: ({ colors, spaces }) => `
                    background-color: ${colors["success"]}20;
                    padding: 4px 9px;
                    border-radius: 13px;
                    margin-left: ${spaces[1]}rem;
                    color: ${colors["success"]}
                  `,
                }}
              >
                {session?.user["percentage"]}%
              </Divider>
            </Heading>
          )}
        </Divider>
        <Divider $margin={{ left: "auto" }}>
          <AnimatePresence mode="popLayout">
            {loading ? (
              <motion.div
                key="button-animation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Animation
                  key="button-animation"
                  $style={() =>
                    `width: 174px; height: 54px; border-radius: 30px;`
                  }
                />
              </motion.div>
            ) : (
              <Divider
                key="button"
                onMouseEnter={() => setIsButtonPopoverVisibilityOpen(true)}
                onMouseLeave={() => {
                  setIsButtonPopoverVisibilityOpen(false);
                }}
                $options={{
                  additionalStyles: () => `min-width: 180px; min-height: 54px;`,
                }}
              >
                <Button
                  key="button"
                  onClick={() => {
                    total > 0 && setIsWithdrawalOpen(true);
                  }}
                  $isDisabled={!(total > 0)}
                  $variant="primary"
                >
                  Create withdrawal
                </Button>

                {!(total > 0) && isButtonPopoverVisibilityOpen && (
                  <Popover>All balances are empty</Popover>
                )}
              </Divider>
            )}
          </AnimatePresence>
        </Divider>
      </Divider>

      <Balances $margin={{ bottom: 2 }}>
        <AnimatePresence>
          {isWithdrawalOpenMemo && (
            <Withdrawal
              key="WithdrawalPopup"
              $close={() => setIsWithdrawalOpen(false)}
              $refetchBalances={() => fetchBalances()}
              $balances={balancesMemo}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
          {loading ? (
            <Container
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader />
            </Container>
          ) : (
            <Container
              key="loaded"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
            >
              {balances?.map((balance) => {
                return (
                  <Balance
                    $withdraw={() => total > 0 && setIsWithdrawalOpen(true)}
                    key={balance.currency.symbol}
                    {...balance}
                  />
                );
              })}
            </Container>
          )}
        </AnimatePresence>
      </Balances>
    </Divider>
  );
};

export { index as Balances };
