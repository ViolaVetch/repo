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
import { User } from "@types";
import { Header } from "@components/Account";

export type TFilters = {
  search?: string;
  active?: string | string[];
};

export const Resellers = () => {
  const router = useRouter();

  const [filters, setFilters] = useState<TFilters>({
    search: "",
  });

  return (
    <Account>
      <Header $title="Resellers">
        <Filters filters={filters} setFilters={setFilters} />
      </Header>

      <Divider
        $direction="column"
        $options={{ additionalStyles: () => `width: 100%;` }}
      >
        <Table<User>
          footerMessage={(item, second, isLoading) =>
            isLoading ? `Fetching ...` : `${second} reseller(s) found`
          }
          getItemsUrl={`${SiteConfig.API}/resellers`}
          filters={filters}
        >
          {({ updatedItems }) => (
            <Divider $direction="column">
              <Row
                $width={{
                  xs: 700,
                  sm: 900,
                }}
                $type="head"
                onClick={() => {}}
                columns={[
                  {
                    value: "ID",
                    size: "smallest",
                  },
                  {
                    value: "Name",
                    size: "medium",
                  },
                  {
                    value: "Email",
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
                  ({ _id, firstName, lastName, email, createdAt }, index) => (
                    <Fragment key={index}>
                      <Row
                        $width={{
                          xs: 700,
                          sm: 900,
                        }}
                        onClick={() => router.push(`/account/resellers/${_id}`)}
                        columns={[
                          {
                            value: `${_id.toString().substr(0, 3)}...`,
                            size: "smallest",
                          },
                          {
                            value: `${firstName} ${lastName}`,
                            size: "medium",
                          },
                          {
                            value: email,
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
