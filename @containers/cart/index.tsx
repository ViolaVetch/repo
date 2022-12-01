// Core types
import type { FC } from "react";

// Vendors
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

// Local components
import { Cart } from "./Cart";
import { Checkout } from "./Checkout";

// Global components
import { Divider, Hero } from "@components";
import { Normal } from "@components/Layouts";

// Global types
import { Store } from "@types";

const index: FC = () => {
  const cart = useSelector((state: Store) => state.cart);

  return (
    <Normal title="Cart & Checkout">
      <Hero
        $title="Cart & Checkout"
        $subtitle="Complete your purchase with cryptocurrencies."
      />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -9 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ type: "spring", delay: 0.25 }}
        >
          <Divider
            $extends="container"
            $direction={{ xs: "column", md: "row" }}
            $options={{
              additionalStyles: () => `
                align-items: flex-start;
              `,
            }}
          >
            <Divider
              $options={{ flex: 4 }}
              $padding={{
                top: 6,
                bottom: 6,
                left: 3,
                right: 3,
              }}
            >
              <Cart />
            </Divider>

            {cart.itemsInCart.length !== 0 ? (
              <Divider
                $options={{ flex: 2 }}
                $padding={{ top: 6, right: 3, bottom: 6, xs: { left: 3 } }}
              >
                <Checkout />
              </Divider>
            ) : null}
          </Divider>
        </motion.div>
      </AnimatePresence>
    </Normal>
  );
};

export { index as Cart };
