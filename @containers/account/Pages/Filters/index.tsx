// Core
import { Fragment } from "react";
import { useRouter } from "next/router";

// Global components
import { Button, Divider, Dropdown, Separator } from "@components";

// Global icons
import { AddIcon } from "@icons";

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
        $placeholder="Search pages by title..."
        $onUpdate={(search) => {
          setFilters({ ...filters, search });
        }}
      />

      <Divider
        $margin={{ xs: { top: 1 }, sm: { top: 1 }, md: { top: 0, left: 2 } }}
      >
        <Dropdown
          $placeholder="Visibility"
          $name="visibility"
          $type="prepopulate"
          $options={{ limit: 6 }}
          $populate={[
            { label: "Published", value: "true" },
            { label: "Unpublished", value: "false" },
          ]}
          $onUpdate={(items) => {
            // Do nothing if items don't exist
            if (!items) return;

            // Exclude sellers from filters
            const { visibility, ...df } = filters;

            // Insert items if there are any, remove object key entirely if there's none
            setFilters(
              items.length > 0 ? { ...filters, visibility: items } : { ...df }
            );
          }}
        />
      </Divider>

      <Separator $axis={{ xs: "x", sm: "x", md: "y" }} $margin={2} />

      <Button
        $variant="primary"
        icon={{
          $icon: "plus",
          $size: 20,
          $color: "white",
        }}
        onClick={() => router.push(`/account/pages/new`)}
      >
        Add a new page
      </Button>
    </Fragment>
  );
};
