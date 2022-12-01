// Core types
import { FC, useContext } from "react";

// Vendors
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

// Global components
import { Divider, Dropdown } from "@components";

// Local context
import { TFilters } from "..";
import { PayoutsContext } from "../..";

// Global types
import { User } from "@types";

// Global styles
import { Animation } from "@styles";

// Global site config
import SiteConfig from "configs/Site.config";

export const Filters: FC<{
  filters: TFilters;
  setFilters: (a: TFilters) => void;
}> = ({ filters, setFilters }) => {
  const { data: session } = useSession();

  // Local context management
  const { loading } = useContext(PayoutsContext);

  return (
    <Divider $alignItems="center">
      <AnimatePresence mode="popLayout">
        {loading ? (
          <motion.div
            key="status-animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Animation
              $style={() =>
                `width: 187.19px; height: 54px; border-radius: 30px;`
              }
            />
          </motion.div>
        ) : (
          <motion.div
            key="status-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Dropdown
              $placeholder="Payment status"
              $name="paid"
              $type="prepopulate"
              $options={{ limit: 6 }}
              $populate={[
                { label: "Pending", value: "false" },
                { label: "Completed", value: "true" },
              ]}
              $onUpdate={(items) => {
                // Do nothing if items don't exist
                if (!items) return;

                // Exclude sellers from filters
                const { paid, ...df } = filters;

                // Insert items if there are any, remove object key entirely if there's none
                setFilters(
                  items.length > 0 ? { ...filters, paid: items } : { ...df }
                );
              }}
            />
          </motion.div>
        )}

        {session?.user.role === "admin" && (
          <Divider $margin={{ left: 2 }}>
            {loading ? (
              <motion.div
                key="sellers-animation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Animation
                  $style={() =>
                    `width: 116.05px; height: 54px; border-radius: 30px;`
                  }
                />
              </motion.div>
            ) : (
              <motion.div
                key="sellers-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Dropdown
                  $placeholder="Sellers"
                  $type="fetch"
                  $name="sellers"
                  $fetch={{
                    url: `${SiteConfig.API}/resellers`,
                  }}
                  $search={{
                    placeholder: "Search sellers...",
                  }}
                  $options={{
                    limit: 8,
                  }}
                  $convertItems={(items) =>
                    items.map(({ store, slug }: User) => ({
                      label: store,
                      value: slug,
                    }))
                  }
                  $onUpdate={(items) => {
                    // Do nothing if items don't exist
                    if (!items) return;

                    // Exclude sellers from filters
                    const { sellers, ...df } = filters;

                    // Insert items if there are any, remove object key entirely if there's none
                    setFilters(
                      items.length > 0
                        ? { ...filters, sellers: items }
                        : { ...df }
                    );
                  }}
                />
              </motion.div>
            )}
          </Divider>
        )}
      </AnimatePresence>
    </Divider>
  );
};
