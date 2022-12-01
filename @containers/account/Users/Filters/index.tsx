// Core
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

// Vendors
import styled from "styled-components";

// Global components
import { Button, Divider, Dropdown, Separator } from "@components";

// Global icons
import { AddIcon, SettingsIcon, ActivityIcon } from "@icons";

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
        $placeholder="Search users by email..."
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
          $placeholder="Status"
          $name="status"
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
        $variant="primary"
        icon={{
          $icon: "plus",
          $size: 20,
          $color: "white",
        }}
        onClick={() => router.push(`/account/users/new`)}
      >
        Add a new user
      </Button>
    </Fragment>
  );
};
