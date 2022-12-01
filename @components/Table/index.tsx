// Exporting local components
export { Row } from "./Row";

// Core
import React, { useState, useEffect } from "react";

// Vendors
import styled, { css } from "styled-components";
import axios from "axios";

// Local components
import { Footer } from "./Footer";
import { isObjectEmpty, objectToQuery } from "@utils/shared";
import { useDebouncedEffect } from "@utils/client";

// Declare local types and interfaces
export type Variants = "preview" | "full";

interface Table<T> {
  search?: {
    visibility: boolean;
    placeholder: string;
  };
  title?: string;
  getItemsUrl: string;
  fetchQuery?: { [x: string]: string | number };
  actions?: JSX.Element | boolean;
  originalItems?: any[];
  filters?: any;
  setIsSearching?: Function;
  $limit?: number;
  $variant?: Variants;
  footerMessage: (
    limit: number,
    total: number,
    isLoading: boolean
  ) => React.ReactNode;
  children({
    updatedItems,
    isLoading,
    getItems,
  }: {
    updatedItems: T[];
    isLoading: boolean;
    getItems: Function;
  }): React.ReactElement;
}

const Table = styled.div`
  position: relative;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints["lg"]}px) {
      overflow-x: scroll;
    }
  `}
`;

const index = <
  /**
   * Define exact table item type
   */
  T,
>({
  children,
  footerMessage,
  $limit = 8,
  getItemsUrl,
  fetchQuery,
  originalItems,
  $variant = "full",
  filters,
}: Table<T>): React.ReactElement => {
  // Store Axios canceling token
  const source = axios.CancelToken.source();

  // Store the current limit of the pagination
  const limit = $variant === "preview" ? 2 : $limit;

  // Store Original and Updated/Filtered items
  const [updatedItems, setUpdatedItems] = useState<any>();

  // Fetched items length
  const [length, setLength] = useState<number>(0);

  // Indicate that new items are loading
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Update pagination to load new items
  const [pagination, setPagination] = useState<number>(0);

  const getItems = async (props: { query?: any }) => {
    // Set loader
    setIsLoading(true);

    /* Reduce array to a parameters string */
    let reduceFetchQuery: string;

    /* Check if fetchQuery is there */
    if (fetchQuery)
      reduceFetchQuery = fetchQuery
        ? Object.keys(fetchQuery).reduce((prev, next) => {
            return `${prev}&${next}=${fetchQuery[next]}`;
          }, ``)
        : ``;

    const provideQuery = () => {
      // Create url with the current limit
      let url = `${getItemsUrl}?limit=${limit}&skip=${pagination}`;
      // Concat fetchQuery
      if (reduceFetchQuery) url = url + `${reduceFetchQuery}`;
      // Assign filters
      if (!isObjectEmpty(filters))
        url = url + `&${objectToQuery({ query: filters })}`;

      return url;
    };

    const requestOptions = {
      url: provideQuery(),
      method: "GET",
    };

    if (getItemsUrl) {
      try {
        await axios(requestOptions)
          .then(({ data: { data } }) => {
            // Update current Items
            setUpdatedItems(data.items);
            // Update fetched length
            setLength(data.length);
            // Disable loader
            setIsLoading(false);
          })
          .catch((e) => {
            if (axios.isCancel(e)) {
              console.table(`Call 2 canceled by user: ${e.message}`);
            } else {
              console.table(`Error sent: ${e.message}`);
            }
          });
      } catch (error) {
        // Handle error
      } finally {
        // Set loader
        setIsLoading(false);
      }
    }
  };

  useDebouncedEffect(
    () => {
      getItems({});

      return () => {
        // Cancel axios fetches
        source.cancel("Cancelling in cleanup");
      };
    },
    [filters, pagination],
    100
  );

  useEffect(() => {
    // Restart pagination
    setPagination(0);
    // Reinsert all original items
    // originalItems && !isFiltered && setUpdatedItems(originalItems);
    originalItems && setUpdatedItems(originalItems);
  }, [originalItems]);

  return (
    <>
      <Table>{children({ updatedItems, isLoading, getItems })}</Table>

      <Footer<T>
        {...{
          limit,
          length,
          pagination,
          setPagination,
          isLoading,
          updatedItems,
          footerMessage,
        }}
      />
    </>
  );
};

export { index as Table };
