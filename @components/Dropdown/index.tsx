// Core
import { type FC, useEffect, useMemo, useState, createContext } from "react";
import { useRouter } from "next/router";

// Vendors
import styled, { css } from "styled-components";
import axios from "axios";

// Global components
import { Divider } from "@components";
import { Popup } from "./Popup";

// Global utilities
import { isObjectEmpty, objectToQuery } from "@utils/shared";

const Button = styled(Divider)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 60px;
  border-width: 1px;
  border-style: solid;
  cursor: pointer;
  user-select: none;
  width: 100%;

  ${({ theme: { colors, spaces } }) => css`
    background-color: ${colors["white"]};
    padding: ${spaces[2]}rem;
  `}

  ${({ $isActive, theme: { colors } }) => {
    switch ($isActive) {
      case true:
        return css`
          border-color: ${colors["primary"]};
          color: ${colors["primary"]};

          svg {
            fill: ${colors["primary"]};
          }
        `;
      default:
        return css`
          color: ${colors["grey"]};
          border-color: ${colors["border"]};

          svg {
            fill: ${colors["border"]};
          }
        `;
    }
  }}
`;

type Item = {
  value: string;
  label: string;
};

interface DropdownProps {
  $placeholder: string;
  $type: "fetch" | "prepopulate";
  $select?: "single" | "multi";
  $fetch?: {
    url: string;
    query?: { [x: string]: string | number };
  };
  $populate?: Item[];
  $search?: {
    placeholder: string;
  };
}

interface DropdownContext extends DropdownProps {
  /**
   * Handles popup visibility alltogether
   */
  setIsOpen: (a: boolean) => void;
  setPagination: (a: number) => void;
  setLimit: (a: number) => void;
  addItem: (a: Item) => void;
  removeItem: (a: Item) => void;
  setUpdatedItems: (a: Item[]) => void;
  selectedItems: Item[];
  originalItems: Item[];
  updatedItems: Item[];
  isLoading: boolean;
  length: number;
  pagination: number;
  limit: number;
  /** In case the default limit is overwritten */
  customLimit?: number;
}

interface Props extends DropdownProps {
  $name: string;
  $initialValues?: string[];
  $options?: {
    limit?: number;
  };
  $convertItems?: (items: any) => Item[];
  $onUpdate: (items: string[]) => void;
}

// Create Context base
export let DropdownContext = createContext({} as DropdownContext);

const index: FC<Props> = ({
  $name,
  $placeholder,
  $type,
  $select = "multi",
  $fetch,
  $options,
  $populate,
  $initialValues,
  $onUpdate,
  $convertItems,
  ...props
}) => {
  const { push, query, pathname } = useRouter();

  // Store Original and Updated/Filtered items
  const [originalItems, setOriginalItems] = useState<Item[] | undefined>(
    $populate ? $populate : undefined
  );
  const [updatedItems, setUpdatedItems] = useState<Item[] | undefined>(
    $populate ? $populate : undefined
  );

  // Store Original and Updated/Filtered items
  const [selectedItems, setSelectedItems] = useState<Item[]>();
  const selectedItemsMemo = useMemo(() => selectedItems, [selectedItems]);

  const addItem = (item: Item) => {
    const selectedItems =
      $select === "multi"
        ? selectedItemsMemo
          ? [...selectedItemsMemo, item]
          : [item]
        : [item];

    // Check if we have other items, and add the new one
    setSelectedItems(selectedItems);

    // Router arrangements
    // update route query
    // by adding the current key
    const currentQuery = Object.keys(query);

    // Check if key was found in current query
    const isAlreadyInQuery = currentQuery.includes($name);
    const t = query[$name];

    // to add the current key from the current query
    let updatedQuery;
    if ($select === "multi") {
      updatedQuery = {
        ...query,
        [$name]: isAlreadyInQuery ? [t, item.value].join(",") : item.value,
      };
    } else {
      if (isAlreadyInQuery) {
        if (item.value === query[$name]) {
          delete query[$name];

          updatedQuery = {
            ...query,
          };
        } else {
          updatedQuery = {
            ...query,
            [$name]: item.value,
          };
        }
      } else {
        updatedQuery = {
          ...query,
          [$name]: item.value,
        };
      }
    }

    // Check if after we delete the key, the query is empty or not, if it's not, push with new query,
    // if yes, push without query
    const page = objectToQuery({ query: updatedQuery });
    // Push router
    push(`${pathname}?${page}`);
  };

  const removeItem = (item: Item) => {
    // Filter out current item from the list
    const filteredSelectedItems = selectedItemsMemo?.filter(
      (e) => e.value != item.value
    );

    // Update selected items
    setSelectedItems(filteredSelectedItems);

    // Update route query
    // by removing the current key
    const currentQuery = Object.keys(query);

    // Check if key was found in current query
    if (currentQuery.includes($name)) {
      const a = query[$name] ? (query[$name] as string)?.split(",") : [];

      // Store current query
      let updatedQuery = query;
      if (a.length > 1) {
        // to delete only the value specified, from the string array
        updatedQuery = {
          ...query,
          [$name]: a.filter((el) => el != item.value),
        };
      } else {
        // to delete the current key from the current query
        delete updatedQuery[$name];
      }
      // Check if after we delete the key, the query is empty or not, if it's not, push with new query,
      // if yes, push without query
      const page = !isObjectEmpty(updatedQuery)
        ? objectToQuery({ query: updatedQuery })
        : "";
      // Push router
      push(`${pathname}${Boolean(page) ? `?${page}` : ``}`);
    }
  };

  // Fetched items length
  const [length, setLength] = useState<number>(0);

  // Indicate that new items are loading
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Update pagination to load new items
  const [pagination, setPagination] = useState<number>(0);

  // Store the current limit of the pagination
  const [limit, setLimit] = useState<number>(
    $options?.limit ? $options.limit : 3
  );

  // Handle popup visibility
  const [isOpen, setIsOpen] = useState(false);
  const memoizedIsOpen = useMemo(() => isOpen, [isOpen]);

  // Fetch url memoized so it doesn't rerender for no reason
  const memoizedFetch = useMemo(() => $fetch?.url, [$fetch]);

  const getItems = async ({
    query,
    api,
  }: {
    query: { [x: string]: string | number };
    api: string;
  }) => {
    // Start loader
    setIsLoading(true);

    // Reduce array to a parameters string
    let reduceFetchQuery: string;

    // Check if fetch query is there
    if (query)
      reduceFetchQuery = Object.keys(query).reduce((prev, next) => {
        return `${prev}&${next}=${query[next]}`;
      }, ``);

    const provideQuery = () => {
      // Create url with the current limit
      let url = `${api}?limit=${limit}&skip=${pagination}`;
      // Concat fetch query
      if (reduceFetchQuery) url = url + `${reduceFetchQuery}`;

      return url;
    };

    // Request options
    const requestOptions = {
      url: provideQuery(),
      method: "GET",
    };

    try {
      $type == "fetch" &&
        (await axios(requestOptions)
          .then(async ({ data: { data } }) => {
            // Handle data only after 200ms (animation setup)
            // setTimeout(() => {
            // Update current Items
            const items = ($convertItems as Function)(data.items);
            // Return converted items and store them as Original and Updated
            setUpdatedItems(items);
            setOriginalItems(items);
            // Update fetched length
            setLength(data.length);
            // }, 100);
          })
          .catch((e) => {
            if (axios.isCancel(e)) {
              console.table(`Call 2 canceled by user: ${e.message}`);
            } else {
              console.table(`Error sent: ${e.message}`);
            }
          }));
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    // Fetch data if fetch is enabled
    if ($fetch && $type == "fetch") {
      getItems({ query: $fetch.query ? $fetch.query : {}, api: $fetch.url });
    }
  }, [memoizedFetch, pagination, limit]);

  // Listen to query
  useEffect(() => {
    if (!selectedItems || selectedItems.length == 0) {
      if (originalItems && !isObjectEmpty(query)) {
        const d = Object.keys(query)
          .map((el) => {
            const c = (query[el] as string).split(",");
            // Check if there are more than 1 values, if so return an array,
            // otherwise return a string
            const f = c.length > 1 ? c : c[0];
            return f;
          })
          .flat(1);

        // Find relevant items to select
        const a = updatedItems?.filter((el) => d.includes(el.value));
        // Apply selected
        if (a) setSelectedItems(a);
      }
    }

    if (selectedItems && selectedItems.length > 0) {
      // Check if selected items is filled and items don't exist in the query
      const iq = query[$name] && (query[$name] as string).split(",");
      // Remove selected items if they're still there
      if (!iq) setSelectedItems([]);
      // Remove the selected items keys, in case that's only needed
      else {
        const oi = originalItems?.filter((el) => iq.includes(el.value));
        setSelectedItems(oi);
      }
    }
  }, [originalItems, query]);

  // Store Original and Updated/Filtered items
  const [isInitial, setIsInitial] = useState<boolean>(true);
  const isInitialMemo = useMemo(() => isInitial, [isInitial]);

  useEffect(() => {
    if (isInitialMemo && $initialValues) {
      if (!query[$name]) {
        const d = $initialValues.length > 0;

        const fq = objectToQuery({
          query: d ? { ...query, [$name]: $initialValues } : query,
        });

        push(`${pathname}?${fq}`);
      }

      // Things to happen for the first time
      setIsInitial(false);
    }
  }, [$initialValues, originalItems]);

  useEffect(() => {
    const itemValues = selectedItemsMemo?.map((el) => el.value);

    if (!$initialValues) {
      $onUpdate(itemValues ? itemValues : []);
    } else if (!isInitialMemo) {
      $onUpdate(itemValues ? itemValues : []);
    }
  }, [selectedItemsMemo]);

  return (
    <DropdownContext.Provider
      value={
        {
          $placeholder,
          $type,
          $select,
          setIsOpen,
          setPagination,
          setLimit,
          setUpdatedItems,
          addItem,
          removeItem,
          originalItems,
          updatedItems,
          selectedItems: selectedItemsMemo,
          pagination,
          length,
          limit,
          isLoading,
          customLimit: $options?.limit,
          ...props,
        } as DropdownContext
      }
    >
      <Divider
        $options={{
          additionalStyles: () => `
            flex: 1;
            width: 100%;
          `,
        }}
      >
        {/* Dropdown button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          $isActive={isOpen || Boolean(selectedItemsMemo?.length)}
        >
          {$placeholder}

          <Divider
            $options={{
              additionalStyles: ({ colors, spaces }) => `
                width: 18px;
                height: 18px;
                align-items: center;
                justify-content: center;
                border-radius: 30px;
                font-size: 12px;
                transition: margin 200ms ease-in-out, opacity 300ms ease-in-out;
                border: 1px solid ${colors["primary"]};
                color: ${colors["primary"]};
                opacity: ${selectedItemsMemo?.length ? 1 : 0};
                margin-left: ${
                  (spaces[selectedItemsMemo?.length ? 1 : 0] as number) / 1.5
                }rem;
                margin-right: ${
                  (spaces[selectedItemsMemo?.length ? 1 : 0] as number) / 1.5
                }rem;
              `,
            }}
          >
            {selectedItemsMemo?.length !== 0 && selectedItemsMemo?.length}
          </Divider>

          {/* Dropdown Icon */}
          <Divider>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="8"
              viewBox="0 0 13 8"
            >
              <path
                d="M1064.043,413.352a.747.747,0,0,1-.53-.22l-5.1-5.1a.75.75,0,1,1,1.061-1.061l4.572,4.572,4.572-4.572a.75.75,0,0,1,1.061,1.061l-5.1,5.1A.748.748,0,0,1,1064.043,413.352Z"
                transform="translate(-1058.19 -406.75)"
              />
            </svg>
          </Divider>
        </Button>

        {/* Handle popup */}
        {memoizedIsOpen && <Popup />}
      </Divider>
    </DropdownContext.Provider>
  );
};

export { index as Dropdown };
