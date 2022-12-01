// Core
import { type FC, Fragment, useState, useMemo, useContext } from "react";

// Vendors
import { DateTime } from "luxon";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

// Global components
import { Divider } from "@components";
import { Table, Row } from "@components/Table";

// Local components
import { Filters } from "./Filters";
import { Status } from "./Status";
import { Balances } from "./Balances";

// Global controllers
import SiteConfig from "configs/Site.config";

// Global types
import { Column, IPayout, User } from "@types";

// Local components
import { Popup } from "./Popup";
import { Header } from "@components/Account";

export type TFilters = {
  paid?: string | string[];
  sellers?: string | string[];
};

const index: FC<{}> = () => {
  const { data: session } = useSession();

  // Manage table filters
  const [filters, setFilters] = useState<TFilters>({});
  const filtersMemo = useMemo(() => filters, [filters]);

  // Handle admin payout status update popup
  const [selectedPayout, setSelectedPayout] = useState<IPayout>();
  const selectedPayoutMemo = useMemo(() => selectedPayout, [selectedPayout]);

  return (
    <Divider $direction="column">
      {/* Account Header */}
      <Header $title="Payouts">
        <Filters filters={filtersMemo} setFilters={setFilters} />
      </Header>

      {session?.user.role === "admin" && (
        <AnimatePresence>
          {selectedPayoutMemo && (
            <Popup
              $close={() => setSelectedPayout(undefined)}
              {...selectedPayoutMemo}
            />
          )}
        </AnimatePresence>
      )}

      <Divider $direction="column">
        <Table<IPayout>
          footerMessage={(item, second, isLoading) =>
            isLoading ? `Fetching ...` : `${second} payout(s) found`
          }
          getItemsUrl={`${SiteConfig.API}/payouts`}
          filters={filtersMemo}
        >
          {({ updatedItems }) => {
            const ownerHead: Column[] =
              session?.user.role === "admin"
                ? [
                    {
                      value: "Owner",
                      size: "medium",
                    },
                    {
                      value: "Logged owner share",
                      size: "medium",
                    },
                  ]
                : [];

            return (
              <Divider $direction="column">
                <Row
                  $type="head"
                  columns={[
                    {
                      value: "ID",
                      size: "smallest",
                    },
                    {
                      value: "Date & Time",
                      size: "small",
                    },
                    {
                      value: "Status",
                      size: "medium",
                    },
                    {
                      value: "Currencies",
                      size: "medium",
                    },
                    ...ownerHead,
                  ]}
                />

                {Array.isArray(updatedItems) &&
                  updatedItems.map((payout, index) => {
                    // Destructure payout
                    const { _id, paid, balances, log, createdAt } = payout;

                    // Define owner
                    const ownerBody: Column[] =
                      session?.user.role === "admin"
                        ? [
                            {
                              children: (
                                <Divider>
                                  {(payout.owner as User).store}
                                </Divider>
                              ),
                              size: "medium",
                            },
                            {
                              children: (
                                <Divider>
                                  {log["owner"] && log["owner"]["percentage"]} %
                                </Divider>
                              ),
                              size: "medium",
                            },
                          ]
                        : [];

                    return (
                      <Fragment key={index}>
                        <Row
                          onClick={() => setSelectedPayout(payout)}
                          columns={[
                            {
                              value: `${_id.toString().substr(0, 3)}...`,
                              size: "smallest",
                            },
                            {
                              value: `${DateTime.fromISO(
                                createdAt.toString()
                              ).toRelative()}`,
                              size: "small",
                            },
                            {
                              children: <Status $isCompleted={paid} />,
                              size: "medium",
                            },
                            {
                              children: <Balances $items={balances} />,
                              size: "medium",
                            },
                            ...ownerBody,
                          ]}
                        />
                      </Fragment>
                    );
                  })}
              </Divider>
            );
          }}
        </Table>
      </Divider>
    </Divider>
  );
};

export { index as Table };
