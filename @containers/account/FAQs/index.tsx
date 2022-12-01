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
import { Header } from "@components/Account";

export type TFilters = {
  search?: string;
  visibility?: string | string[];
};

export const FAQs = () => {
  const router = useRouter();

  const [filters, setFilters] = useState<TFilters>({
    search: "",
  });

  return (
    <Account>
      <Header $title="FAQs">
        <Filters filters={filters} setFilters={setFilters} />
      </Header>

      <Divider
        $direction="column"
        $options={{ additionalStyles: () => `width: 100%;` }}
      >
        <Table
          footerMessage={(item, second, isLoading) =>
            isLoading ? `Fetching ...` : `${second} faq(s) found`
          }
          getItemsUrl={`${SiteConfig.API}/faqs`}
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
                    value: "Question",
                    size: "medium",
                  },
                  {
                    value: "Visibility",
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
                    { _id, question, visibility, createdAt, updatedAt },
                    index
                  ) => (
                    <Fragment key={index}>
                      <Row
                        onClick={() => router.push(`/account/faqs/${_id}`)}
                        columns={[
                          {
                            value: `${_id.substr(0, 3)}...`,
                            size: "smallest",
                          },
                          {
                            value: `${question}`,
                            size: "medium",
                          },
                          {
                            value: visibility ? "Published" : "Unpublished",
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
