// Core
import { useRouter } from "next/router";
import { Fragment } from "react";

// Global components
import { Button, Divider, Dropdown, Separator } from "@components";

// Global components
import { Search } from "@components";

// Local context
import { TFilters } from "..";

export const Filters = ({
  filters,
  setFilters,
}: {
  filters: TFilters;
  setFilters: (a: TFilters) => void;
}) => {
  const router = useRouter();

  return (
    <Fragment>
      <Search
        $hasBorder
        $placeholder="Search resellers by email..."
        $onUpdate={(search) => {
          setFilters({ ...filters, search });
        }}
      />

      <Divider
        $margin={{
          xs: { top: 1 },
          sm: { top: 1 },
          md: { top: 0, left: 2 },
        }}
      >
        <Dropdown
          $name="status"
          $placeholder="Status"
          $select="single"
          $type="prepopulate"
          $options={{ limit: 6 }}
          $populate={[
            { label: "Active", value: "true" },
            { label: "Not active", value: "false" },
          ]}
          $onUpdate={(items) => {
            // Do nothing if items don't exist
            if (!items) return;

            // Exclude sellers from filters
            const { active, ...df } = filters;

            // Insert items if there are any, remove object key entirely if there's none
            setFilters(
              items.length > 0 ? { ...filters, active: items } : { ...df }
            );
          }}
        />
      </Divider>

      <Separator $axis={{ xs: "x", sm: "x", md: "y" }} $margin={2} />

      <Button
        icon={{
          $icon: "plus",
          $size: 20,
          $color: "white",
        }}
        $variant="primary"
        onClick={() => router.push(`/account/resellers/new`)}
      >
        Add a new reseller
      </Button>
    </Fragment>
  );
};
