// Core
import { type FC, useState, useMemo, useContext } from "react";
import { useRouter } from "next/router";

// Vendors
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

// Global components
import { Divider } from "@components/Divider";
import { Button, Loader } from "@components";

// Local compponents
import { Balances } from "./Balances";

// Global API Methods
import { useDispatch } from "react-redux";

// Global types
import { IPayout, User } from "@types";

// Global methods
import { putItems } from "@methods/putItems";
import { PayoutsContext } from "../..";

const Popup = styled(motion.div)`
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

const Content = styled(motion.div)`
  width: 600px;
  z-index: 4;

  ${({ theme: { spaces, colors } }) => css`
    padding: ${spaces[3]}rem;
    border-radius: 19px;
    background-color: ${colors["white"]};
  `}
`;

interface Popup extends IPayout {
  $close: () => void;
}

const index: FC<Popup> = ({ $close, ...payout }) => {
  // Handke payout context and get loader
  const { loading, setLoading } = useContext(PayoutsContext);

  // Vendor fn
  const dispatch = useDispatch();

  // Handle Popup request
  const handlePayout = async () => {
    putItems({
      data: { ...payout, paid: true },
      target: payout._id,
      model: "payouts",
      setLoading,
      onSuccess: () => {
        setTimeout(() => {
          // Close payout
          $close();
        }, 200);
      },
      timeout: 300,
      dispatch,
    });
  };

  return (
    <Popup>
      {/* Overlay, popup closed */}
      <Overlay
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        onClick={() => $close()}
      />

      {/* Popup handler */}
      <Content
        key="popup"
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
          {payout["paid"]
            ? `Payout completed for ${(payout.owner as unknown as User).store}`
            : `Create payout for ${(payout.owner as unknown as User).store}`}
        </Divider>

        {/* Body */}
        <Divider $padding={{ top: 3, bottom: 3 }} $direction="column">
          {payout["paid"]
            ? "Payout was completed, for the balances shown below:"
            : "Please confirm payout for the balances shown below:"}
          <Balances
            $items={payout.balances}
            $owner={payout.owner as unknown as User}
          />
        </Divider>

        {/* Footer / Buttons */}
        <Divider>
          {!payout["paid"] && (
            <Divider $margin={{ right: 1 }}>
              <Button
                $variant="primary"
                onClick={() => !payout["paid"] && handlePayout()}
                type="button"
              >
                {loading ? (
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
          )}

          <Button
            $variant="primary"
            $style="outline"
            type="button"
            onClick={() => $close()}
          >
            {/* <CancelIcon size=".75em" color="#5a41dc" /> */}
            <Divider
              $margin={payout["paid"] ? {} : { left: 1 }}
              $color="primary"
            >
              {payout["paid"] ? "Close" : "Cancel"}
            </Divider>
          </Button>
        </Divider>
      </Content>
    </Popup>
  );
};

export { index as Popup };
