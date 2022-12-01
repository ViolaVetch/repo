// Core
import { Fragment, useEffect, useState } from "react";

// Core types
import type { FC } from "react";

// Global components
import { Button, Divider, Heading } from "@components";

// Global icons
import { Plus, WalletIcon } from "@icons";

// Global types
import { ICurrency, IUserWallet, User } from "@types";

// Local container imports
import type { IResellerFields } from "..";

// Local components
import { Wallet } from "./Wallet";

// Vendors
import { useFormikContext, FieldArray } from "formik";
import mongoose from "mongoose";
import { useDispatch } from "react-redux";

// Global styles
import { Animation } from "@styles";

// Global methods
import { getItems } from "@methods/getItems";
import { AnimatePresence, motion } from "framer-motion";

interface Password {}

const Loader: FC<{}> = () => {
  return (
    <Divider
      $direction="column"
      $options={{
        additionalStyles: () => `
          flex: 1;
          width: 100%;
        `,
      }}
    >
      <Divider
        as={Animation}
        $margin={{ bottom: 2 }}
        $options={{
          additionalStyles: () => `
            height: 63.02px;
            width: 100%;
          `,
        }}
      />

      <Divider
        as={Animation}
        $margin={{ bottom: 2 }}
        $options={{
          additionalStyles: () => `
            height: 54px;
            max-width: 175.97px;
            border-radius: 30px !important;
          `,
        }}
      />
    </Divider>
  );
};

const index: FC<Password> = () => {
  // Destructure formik's context
  const { values } = useFormikContext<IResellerFields>();

  const dispatch = useDispatch();

  const [currencies, setCurrencies] = useState<ICurrency[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItems<ICurrency>({
      dispatch,
      setLoading,
      onSuccess: ({ data }) => {
        // Handle currencies loader
        if (data?.items) setCurrencies(data.items);
      },
      timeout: 800,
      model: "currencies",
    });
  }, [,]);

  return (
    <Divider
      $direction="column"
      $options={{
        additionalStyles: ({ colors }) => `
          border-bottom: 1px solid ${colors["border"]};
        `,
      }}
    >
      {/* Header */}
      <Divider>
        <Heading
          $as="h5"
          $margin={{ top: 2, bottom: 3 }}
          $options={{
            additionalStyles: ({ colors, spaces }) => `
              display: flex;
              align-items: center;
              color: ${colors["primary"]};
              svg {
                margin-right: ${(spaces[1] as number) / 2}rem;
              }
            `,
          }}
        >
          <Fragment>
            <WalletIcon $size={30} $color="primary" />

            <Divider
              $direction="column"
              $options={{
                additionalStyles: ({ spaces }) => `
                  padding-left: ${spaces[1] as number}rem;
                `,
              }}
            >
              Wallets
            </Divider>
          </Fragment>
        </Heading>
      </Divider>

      <AnimatePresence mode="popLayout">
        {loading ? (
          <motion.div
            key="loading-animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Divider $direction="column" $margin={{ bottom: 2 }}>
              {/* Start of the content */}
              <FieldArray
                name={`wallets`}
                render={(arrayHelpers) => (
                  <Fragment>
                    {values["wallets"]?.map(
                      (wallet: IUserWallet, index: number) =>
                        currencies && (
                          <Wallet
                            {...wallet}
                            $currencies={currencies}
                            key={wallet._id.toString()}
                            $remove={() => arrayHelpers.remove(index)}
                            $index={index}
                          />
                        )
                    )}

                    <Divider>
                      <Button
                        $variant="primary"
                        icon={{
                          $icon: "plus",
                          $color: "white",
                          $size: 20,
                        }}
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            _id: new mongoose.Types.ObjectId(),
                            name: "",
                            address: "",
                          })
                        }
                      >
                        Add new wallet
                      </Button>
                    </Divider>
                  </Fragment>
                )}
              />
            </Divider>
          </motion.div>
        )}
      </AnimatePresence>
    </Divider>
  );
};

export { index as Wallets };
