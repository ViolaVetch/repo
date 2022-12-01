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

// Local components
import { Filters } from "./Filters";
import { IProductCategory } from "@types";
import { Header } from "@components/Account";

export type TFilters = {
  search?: string;
  active?: string | string[];
};

export const Categories = () => {
  const { push } = useRouter();

  const [filters, setFilters] = useState<TFilters>({ search: "" });

  return (
    <Account>
      <Header $title="Categories">
        <Filters filters={filters} setFilters={setFilters} />
      </Header>

      <Divider
        $direction="column"
        $options={{ additionalStyles: () => `width: 100%;` }}
      >
        <Table<IProductCategory>
          footerMessage={(item, second, isLoading) =>
            isLoading
              ? `Fetching ...`
              : `${second} categorie(s) found`
          }
          getItemsUrl={`${SiteConfig.API}/categories`}
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
                    value: "Path",
                    size: "medium",
                  },
                  {
                    value: "Date & Time",
                    size: "small",
                  },
                ]}
              />

              {Array.isArray(updatedItems) &&
                updatedItems.map(({ _id, name, path, createdAt }, index) => (
                  <Fragment key={index}>
                    <Row
                      onClick={() => push(`/account/categories/${_id}`)}
                      columns={[
                        {
                          value: `${_id.toString().substr(0, 3)}...`,
                          size: "smallest",
                        },
                        {
                          value: name,
                          size: "medium",
                        },
                        {
                          value: path,
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
                ))}
            </Divider>
          )}
        </Table>
      </Divider>
    </Account>
  );
};
