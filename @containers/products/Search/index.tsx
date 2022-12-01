// Core
import { useEffect, useContext, useState, useMemo } from "react";
import { useRouter } from "next/router";

// Core
import type { FC } from "react";

// Global components
import { Divider, Dropdown, Search } from "@components";

// Global types
import { IProductCategory, User as UserType } from "@types";

// Global configurations
import SiteConfig from "configs/Site.config";

// Local context, types, etc
import { ProductsContext } from "..";
import { useDebouncedEffect } from "@utils/client";

const index: FC<{}> = (): any => {
  // Extract product context to use filters and setFilters keys
  const { setFilters } = useContext(ProductsContext);

  // Storing each settings separately because of one-time trigger from Dropdown
  // Experimenting with correct behaviour patterns
  const [search, setSearch] = useState({});
  const [availability, setAvailability] = useState({});
  const [sellers, setSellers] = useState({});
  const [categories, setCategories] = useState({});

  useDebouncedEffect(
    () => {
      setFilters({ ...search, ...categories, ...availability, ...sellers });
    },
    [search, availability, categories, sellers],
    100
  );

  return (
    <Divider
      $direction={{ xs: "column", sm: "row" }}
      $options={{
        additionalStyles: ({ colors, spaces, breakpoints }) => `
          background-color: ${colors["white"]};
          border-radius: 35px;
          padding: ${(spaces[2] as number) * 1.25}rem ${spaces[2]}rem;
          
          
          @media (max-width: ${breakpoints["md"]}px) {
            width: 100%;
            min-width: calc(100vw - ${(spaces[2] as number) * 2}rem);
          }

          @media (min-width: ${breakpoints["md"]}px) {
            padding: ${spaces[2]}rem;
            border-radius: 60px;
            margin-right: ${spaces[2]}rem;
          }
        `,
      }}
    >
      <Search
        $placeholder="Search products.."
        $onUpdate={(value) => {
          // Insert items if there are any, remove object key entirely if there's none
          setSearch(value ? { search: value } : {});
        }}
      />

      <Divider $margin={{ sm: { left: 2 }, xs: { top: 2, bottom: 2 } }}>
        <Dropdown
          $placeholder="Categories"
          $type="fetch"
          $name="categories"
          $onUpdate={(items) => {
            // Insert items if there are any, remove object key entirely if there's none
            setCategories({ categories: items });
          }}
          $fetch={{
            url: `${SiteConfig.API}/categories`,
          }}
          $search={{
            placeholder: "Search categories...",
          }}
          $options={{
            limit: 3,
          }}
          $convertItems={(items) =>
            items.map(({ name, path }: IProductCategory) => ({
              label: name,
              value: path,
            }))
          }
        />
      </Divider>

      <Divider $margin={{ sm: { left: 2 }, xs: { bottom: 2 } }}>
        <Dropdown
          $type="prepopulate"
          $select="single"
          $name="availability"
          $populate={[
            { value: "true", label: "In stock" },
            { value: "false", label: "Out of stock" },
          ]}
          $placeholder="Stock"
          $onUpdate={(items) => {
            // Insert items if there are any, remove object key entirely if there's none
            setAvailability({ availability: items });
          }}
          $convertItems={(items) =>
            items.map(({ name, path }: any) => ({ label: name, value: path }))
          }
        />
      </Divider>

      <Divider $margin={{ sm: { left: 2 } }}>
        <Dropdown
          $placeholder="Sellers"
          $type="fetch"
          $name="sellers"
          $onUpdate={(items) => {
            // Insert items if there are any, remove object key entirely if there's none
            setSellers({ sellers: items });
          }}
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
        />
      </Divider>
    </Divider>
  );
};

export { index as Search };
