// Core
import { useRouter } from "next/router";

// Global components
import { Dropdown, Divider, Search, Button, Separator } from "@components";

// Local
import { TFilters } from "..";

// Global types
import type { User as UserType } from "@types";

// Global icons
import { AddIcon } from "@icons";

// Global configuration
import SiteConfig from "configs/Site.config";

// Vendors
import { useSession } from "next-auth/react";
import { Fragment } from "react";

export const Filters = ({
  filters,
  setFilters,
}: {
  filters: TFilters;
  setFilters: (e: TFilters) => void;
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Fragment>
      <Search
        $hasBorder
        $placeholder="Search products..."
        $onUpdate={(search) => setFilters({ ...filters, search })}
      />

      <Divider
        $margin={{
          xs: { top: 1, bottom: 1 },
          sm: { top: 1, bottom: 1 },
          md: { top: 0, bottom: 0, left: 2, right: 2 },
        }}
      >
        <Dropdown
          $placeholder="Status"
          $type="prepopulate"
          $name="visibility"
          $options={{ limit: 6 }}
          $select="single"
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

      <Dropdown
        $placeholder="Categories"
        $type="fetch"
        $name="categories"
        $onUpdate={(items) => {
          // Do nothing if items don't exist
          if (!items) return;

          // Exclude sellers from filters
          const { categories, ...df } = filters;

          // Insert items if there are any, remove object key entirely if there's none
          setFilters(
            items.length > 0 ? { ...filters, categories: items } : { ...df }
          );
        }}
        $fetch={{
          url: `${SiteConfig.API}/categories`,
        }}
        $search={{
          placeholder: "Search categories...",
        }}
        $convertItems={(items) =>
          items.map(({ name, path }: any) => ({
            label: name,
            value: path,
          }))
        }
      />

      {session?.user.role === "admin" && (
        <Divider
          $margin={{ xs: { top: 1 }, sm: { top: 1 }, md: { top: 0, left: 2 } }}
        >
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
        </Divider>
      )}

      <Separator $axis={{ xs: "x", sm: "x", xl: "y" }} $margin={2} />

      <Button
        $variant="primary"
        icon={{
          $icon: "plus",
          $size: 20,
          $color: "white",
        }}
        type="button"
        onClick={() => router.push(`/account/products/new`)}
      >
        Add new product
      </Button>
    </Fragment>
  );
};
