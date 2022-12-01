// Core
import { useState, Fragment } from "react";
import { useRouter } from "next/router";

// Vendors
import { DateTime } from "luxon";

// Global components
import { Divider } from "@components";
import { Table, Row } from "@components/Table";
import { Account } from "@components/Layouts";

// Local components
import { Filters } from "./Filters";

// Global controllers
import SiteConfig from "configs/Site.config";

// Global types
import { ICoupon } from "@types";
import { Header } from "@components/Account";

export type TFilters = {
  search?: string;
  usable?: string | string[];
};

export const Coupons = () => {
  const router = useRouter();

  const [filters, setFilters] = useState<TFilters>({
    search: "",
  });

  return (
    <Account>
      <Header $title="Coupons">
        <Filters filters={filters} setFilters={setFilters} />
      </Header>

      <Divider
        $direction="column"
        $options={{ additionalStyles: () => `width: 100%;` }}
      >
        <Table<ICoupon>
          footerMessage={(item, second, isLoading) =>
            isLoading
              ? `Fetching ...`
              : `${second} coupon(s) found`
          }
          getItemsUrl={`${SiteConfig.API}/coupons`}
          filters={filters}
        >
          {({ updatedItems }) => (
            <Divider $direction="column">
              <Row
                $type="head"
                onClick={() => {}}
                columns={[
                  {
                    value: "ID",
                    size: "smallest",
                  },
                  {
                    value: "Code",
                    size: "medium",
                  },
                  {
                    value: "Sale",
                    size: "medium",
                  },
                  {
                    value: "Usable",
                    size: "medium",
                  },
                  {
                    value: "Limit",
                    size: "medium",
                  },
                  {
                    value: "Date & Time",
                    size: "small",
                  },
                ]}
              />

              {Array.isArray(updatedItems) &&
                updatedItems.map(
                  ({ _id, code, sale, usable, uses, createdAt }, index) => (
                    <Fragment key={index}>
                      <Row
                        onClick={() => router.push(`/account/coupons/${_id}`)}
                        columns={[
                          {
                            value: `${_id.toString().substr(0, 3)}...`,
                            size: "smallest",
                          },
                          {
                            value: code,
                            size: "medium",
                          },
                          {
                            value: `${sale}%`,
                            size: "medium",
                          },
                          {
                            value: usable ? "Available" : "Not available",
                            size: "medium",
                          },
                          {
                            value: uses.toString(),
                            size: "medium",
                          },
                          {
                            value: `${DateTime.fromISO(
                              createdAt.toString()
                            ).toRelative()}`,
                            size: "small",
                          },
                        ]}
                      />
                    </Fragment>
                  )
                )}
            </Divider>
          )}
        </Table>
      </Divider>
    </Account>
  );
};
