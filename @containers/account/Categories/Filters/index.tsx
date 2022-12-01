// Core
import { Fragment } from "react";
import { useRouter } from "next/router";

// Vendors
import styled from "styled-components";

// Global icons
import { AddIcon } from "@icons";

// Global components
import { Search, Button, Linebreak, Separator } from "@components";

export const Filters = (props: any): any => {
  const router = useRouter();

  return (
    <Fragment>
      <Search
        $hasBorder
        $placeholder="Search categories..."
        $onUpdate={(search) => props.setFilters({ ...props.filters, search })}
      />

      <Separator $axis={{ xs: "x", sm: "x", md: "y" }} $margin={2} />

      <Button
        $variant="primary"
        icon={{
          $icon: "plus",
          $size: 20,
          $color: "white",
        }}
        onClick={() => router.push(`/account/categories/new`)}
      >
        Add new category
      </Button>
    </Fragment>
  );
};
