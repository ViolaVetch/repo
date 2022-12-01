// Global components
import { Dropdown, Divider, Search } from "@components";

// Core
import { Fragment } from "react";

// Local
import { TFilters } from "..";

// Global types
import type { User as UserType } from "@types";

// Global configuration
import SiteConfig from "configs/Site.config";
import { useSession } from "next-auth/react";

export const Filters = ({
  filters,
  setFilters,
}: {
  filters: TFilters;
  setFilters: (a: TFilters) => void;
}) => {
  const { data: session } = useSession();

  return (
    <Fragment>
      <Search
        $hasBorder
        $placeholder="Search orders by email"
        $onUpdate={(value) => {
          // Exclude sellers from filters
          const { search, ...df } = filters;

          // Insert items if there are any, remove object key entirely if there's none
          setFilters(value ? { ...df, search: value } : { ...df });
        }}
      />

      <Divider
        $margin={{ xs: { top: 1 }, sm: { top: 1 }, md: { top: 0, left: 2 } }}
      >
        <Dropdown
          $placeholder="Status"
          $name="status"
          $type="prepopulate"
          $options={{ limit: 6 }}
          $populate={[
            { label: "Created", value: "created" },
            { label: "Pending", value: "pending" },
            { label: "Confirmed", value: "confirmed" },
            { label: "Unfulfilled", value: "unfulfilled" },
            { label: "Failed", value: "failed" },
          ]}
          $onUpdate={(items) => {
            // Do nothing if items don't exist
            if (!items) return;

            // Exclude sellers from filters
            const { status, ...df } = filters;

            // Insert items if there are any, remove object key entirely if there's none
            setFilters(
              items.length > 0 ? { ...filters, status: items } : { ...df }
            );
          }}
        />
      </Divider>

      <Divider
        $margin={
          session?.user.role == "admin"
            ? {
                xs: { top: 1, bottom: 1 },
                sm: { top: 1, bottom: 1 },
                md: { top: 0, bottom: 0, left: 2, right: 2 },
              }
            : { left: 2 }
        }
      >
        <Dropdown
          $placeholder="Period"
          $type="prepopulate"
          $name="period"
          $options={{ limit: 6 }}
          $select="single"
          $populate={[
            { label: "Today", value: "today" },
            { label: "Last week", value: "last-week" },
            { label: "Last month", value: "last-month" },
            { label: "Last year", value: "last-year" },
          ]}
          $onUpdate={(items) => {
            // Do nothing if items don't exist
            if (!items) return;

            // Exclude sellers from filters
            const { period, ...df } = filters;

            // Insert items if there are any, remove object key entirely if there's none
            setFilters(
              items.length > 0 ? { ...filters, period: items } : { ...df }
            );
          }}
        />
      </Divider>

      {session?.user.role == "admin" && (
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
            items.map(({ store, slug }: UserType) => ({
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
              items.length > 0 ? { ...filters, sellers: items } : { ...df }
            );
          }}
        />
      )}
    </Fragment>
  );
};
export default Filters;
