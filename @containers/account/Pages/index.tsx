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
import { IPage } from "@types";
import { Header } from "@components/Account";

export type TFilters = {
  search?: string;
  visibility?: string | string[];
};

export const Pages = () => {
  const router = useRouter();

  const [filters, setFilters] = useState<TFilters>({
    search: "",
  });

  return (
    <Account>
      <Header $title="Pages">
        <Filters filters={filters} setFilters={setFilters} />
      </Header>

      <Divider
        $direction="column"
        $options={{ additionalStyles: () => `width: 100%;` }}
      >
        <Table<IPage>
          footerMessage={(item, second, isLoading) =>
            isLoading ? `Fetching ...` : `${second} page(s) found`
          }
          getItemsUrl={`${SiteConfig.API}/pages`}
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
                    value: "Title",
                    size: "medium",
                  },
                  {
                    value: "Path",
                    size: "medium",
                  },
                  {
                    value: "Visibility",
                    size: "medium",
                  },
                  {
                    value: "Views",
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
                  (
                    {
                      _id,
                      title,
                      path,
                      visibility,
                      views,
                      createdAt,
                      updatedAt,
                    },
                    index
                  ) => (
                    <Fragment key={index}>
                      <Row
                        onClick={() => router.push(`/account/pages/${_id}`)}
                        columns={[
                          {
                            value: `${_id.toString().substr(0, 3)}...`,
                            size: "smallest",
                          },
                          {
                            value: title,
                            size: "medium",
                          },
                          {
                            value: path,
                            size: "medium",
                          },
                          {
                            value: visibility ? "Published" : "Unpublished",
                            size: "medium",
                          },
                          {
                            value: views.toString(),
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
