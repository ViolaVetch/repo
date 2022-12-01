// Core
import { useState, Fragment } from "react";
import { useRouter } from "next/router";

// Global controllers
import SiteConfig from "configs/Site.config";

// Vendors
import { DateTime } from "luxon";

// Global components
import { Table, Row } from "@components/Table";
import { Divider } from "@components/Divider";
import { Account } from "@components/Layouts";

export type TFilters = {
  search?: string;
  active?: string | string[];
};

// Local components
import { Filters } from "./Filters";
import { Header } from "@components/Account";

export const Users = () => {
  const { push } = useRouter();

  const [filters, setFilters] = useState<TFilters>({
    search: "",
  });

  return (
    <Account>
      <Header $title="Users">
        <Filters filters={filters} setFilters={setFilters} />
      </Header>

      <Divider
        $direction="column"
        $options={{ additionalStyles: () => `width: 100%;` }}
      >
        <Table
          footerMessage={(item, second, isLoading) =>
            isLoading ? `Fetching ...` : `${second} user(s) found`
          }
          getItemsUrl={`${SiteConfig.API}/users`}
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
                        onClick={() => push(`/account/users/${_id}`)}
                        columns={[
                          {
                            value: `${_id.substr(0, 3)}...`,
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
                              createdAt
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
