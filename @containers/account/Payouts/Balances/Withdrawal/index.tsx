// Core
import { type FC, useState, useMemo, useContext, useEffect } from "react";
import { useRouter } from "next/router";

// Vendors
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

// Global components
import { Divider } from "@components/Divider";
import { Button, Loader } from "@components";

// Global types
import { IBalance, ICurrency, IUserWallet, User } from "@types";

// Global API Methods
import { useDispatch } from "react-redux";
import { PayoutsContext } from "../..";

// Global methods
import { postItems } from "@methods/postItems";
import { getItems } from "@methods/getItems";
import { useSession } from "next-auth/react";

const Withdrawal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;

  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    background-color: ${colors["secondary"]}40;
  `}
`;

const Popup = styled(motion.div)`
  width: 600px;
  z-index: 4;

  ${({ theme: { spaces, colors } }) => css`
    padding: ${spaces[3]}rem;
    border-radius: 19px;
    background-color: ${colors["white"]};
  `}
`;

interface Withdrawal {
  $balances: IBalance[];
  $close: () => void;
  $refetchBalances: () => void;
}

const index: FC<Withdrawal> = ({ $balances, $close, $refetchBalances }) => {
  // Check logged-in user
  const { data: session } = useSession();

  const { push } = useRouter();
  const { setLoading: setPayoutsLoading } = useContext(PayoutsContext);

  // Filter any balances that have amounts and have a wallet
  const filterEnabled = $balances.filter(
    ({ isActive, amount }) => amount > 0 && isActive
  );

  // Filter any balances that have amounts but don't have a wallet
  const filterDisabled = $balances.filter(
    ({ isActive, amount }) => amount > 0 && !isActive
  );

  // Check if withdrawal disabled
  const isWithdrawalDisabled = filterDisabled.length > 0;

  // Handle withdrawal creation loader
  const [loading, setLoading] = useState<boolean>(false);
  const loadingMemo = useMemo(() => loading, [loading]);

  // Vendor fn
  const dispatch = useDispatch();

  // Handle current user
  const [wallets, setWallets] = useState<IUserWallet[] | null>(null);
  const walletsMemo = useMemo(() => wallets, [wallets]);

  const fetchUser = () =>
    getItems<User>({
      model: "resellers",
      query: { _id: (session as any)["user"]["_id"].toString() },
      onSuccess: ({ data }) => {
        const [item] = data["items"];

        if (item["wallets"]) {
          // Map through current enabled currencies and get their IDs only
          const enabledIds = filterEnabled.map((el) =>
            el.currency._id.toString()
          );

          // Filter enabled wallets
          const wallets = item["wallets"].filter((el) =>
            enabledIds.includes((el.currency as ICurrency)._id.toString())
          );

          // Store these wallets
          setWallets(wallets);
        }
      },
      setLoading,
      dispatch,
    });

  // Handle withdrawal request
  const handleWithdrawal = async () => {
    if (!isWithdrawalDisabled)
      await postItems({
        model: "payouts",
        onSuccess: (t) => {
          // Close popup
          $close();
          // Refetch balances
          $refetchBalances();
          // Set payouts loading
          setPayoutsLoading(true);
          // Disable payouts loading
          setTimeout(() => {
            // Set payouts loading
            setPayoutsLoading(false);
          }, 500);
        },
        setLoading,
        data: {},
        dispatch,
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Withdrawal>
      {/* Overlay, popup closed */}
      <Overlay
        key="withdrawalOverlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      />

      {/* Popup handler */}
      <Popup
        key="WithdrawalPopup"
        initial={{ y: -40, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { type: "spring", delay: 0.1 },
        }}
        exit={{
          y: -10,
          opacity: 0,
          transition: { type: "spring", duration: 0.35 },
        }}
      >
        {/* Header */}
        <Divider
          $padding={{ bottom: 2 }}
          $options={{
            additionalStyles: ({ colors }) => `
              font-size: 24px; 
              border-bottom: 1px solid ${colors["border"]};
            `,
          }}
        >
          Create withdrawal
        </Divider>

        {/* Body */}
        <Divider $padding={{ top: 3, bottom: 3 }} $direction="column">
          <Divider
            $options={{
              additionalStyles: ({ spaces, font, colors }) =>
                `
                  margin-bottom: ${spaces[2]}rem;
                `,
            }}
          >
            {isWithdrawalDisabled
              ? "Something wen't wrong trying to create withdrawal."
              : "Are you sure you want to withdraw all balances?"}
          </Divider>

          {!isWithdrawalDisabled && (
            <>
              {wallets?.map((wallet) => (
                <Divider
                  key={wallet._id.toString()}
                  $direction="column"
                  $options={{
                    additionalStyles: ({ spaces, font }) => `
                      font-size: 14px;
                      font-weight: ${font["weight"]["medium"]};
                      margin-top: ${(spaces[2] as number) / 2}rem;
                    `,
                  }}
                >
                  {(wallet.currency as ICurrency).name}
                  <Divider
                    $options={{
                      additionalStyles: ({ spaces, colors }) => `
                        background-color: ${colors["border"]};
                        color: ${colors["secondary"]};
                        padding: ${spaces[1]}rem;
                        border-radius: 6px;
                        font-size: 13px;
                        opacity: 0.85;
                      `,
                    }}
                  >
                    {wallet.addr}
                  </Divider>
                </Divider>
              ))}
            </>
          )}

          {isWithdrawalDisabled && (
            <Divider
              $direction="column"
              $options={{
                additionalStyles: ({ spaces, font, colors }) =>
                  `
                  display: block;
                  font-size: 13px;
                  font-weight: ${font["weight"]["medium"]};
                `,
              }}
            >
              Below wallets are not available, please assign wallets on{" "}
              <Divider
                as="span"
                onClick={() => push("/account/profile")}
                $options={{
                  additionalStyles: ({ spaces, font, colors }: any) =>
                    `
                      display: inline-block;
                      cursor: pointer;
                      color: ${colors["primary"]};
                    `,
                }}
              >
                Your Profile
              </Divider>{" "}
              page and check again later.
              {filterDisabled.map((balance) => (
                <Divider
                  key={balance.currency.name}
                  $options={{
                    additionalStyles: ({ spaces, font, colors }) =>
                      `
                        font-weight: ${font["weight"]["medium"]};
                        margin-top: ${(spaces[2] as number) / 2}rem;
                        color: ${colors["danger"]};
                      `,
                  }}
                >
                  {balance.currency.name}
                </Divider>
              ))}
            </Divider>
          )}
        </Divider>

        {/* Footer / Buttons */}
        <Divider>
          {(() => {
            const isDisabled = filterDisabled.length > 0;

            return (
              <Divider
                $margin={{ right: 1 }}
                $options={{
                  additionalStyles: () => `
                    ${isDisabled && `opacity: 0.5`}
                  `,
                }}
              >
                <Button
                  type="button"
                  $variant="primary"
                  $isDisabled={isWithdrawalDisabled}
                  onClick={() => handleWithdrawal()}
                >
                  {loadingMemo ? (
                    <Loader
                      key="Custom"
                      $size={20}
                      $color="white"
                      $type="normal"
                    />
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </Divider>
            );
          })()}

          <Button
            $variant="primary"
            $style="outline"
            type="button"
            onClick={() => $close()}
          >
            {/* <CancelIcon size=".75em" color="#5a41dc" /> */}
            <Divider $margin={{ left: 1 }} $color="primary">
              Cancel
            </Divider>
          </Button>
        </Divider>
      </Popup>
    </Withdrawal>
  );
};

export { index as Withdrawal };
