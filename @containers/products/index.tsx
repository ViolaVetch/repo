// Core
import {
  FC,
  useEffect,
  useState,
  useContext,
  createContext,
  useMemo,
  useRef,
} from "react";

// Vendors
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

// Local components
import { Search } from "./Search";

// Global icons
import { Sync } from "@icons";

// Global components
import { Divider, Hero, Grid, Loader, Empty, Button } from "@components";
import { Normal } from "@components/Layouts";

// Global types
import type { IProduct } from "@types";

// Global utils
import { isObjectEmpty } from "@utils/shared";
import { useDebouncedEffect } from "@utils/client";

// Global methods
import { getItems } from "@methods/getItems";
import { Icon } from "@components/Icon";

// Filters type
export type TFilters = {
  search?: string;
  availability?: string[];
  sellers?: string[];
  categories?: string[];
};

// Create Context base
export interface IProductsContext {
  initial: number;
  limit: number;
  isLoading: boolean;
  setIsLoading: (a: boolean) => void;
  filters: TFilters;
  setFilters: (a: TFilters) => void;
  hasFilters: boolean;
  pagination: number;
  setPagination: (a: number) => void;
  products: IProduct[];
  setProducts: (a: IProduct[] | undefined) => void;
  length: number;
  setLength: (a: number) => void;
  query: { [x: string]: string | string[] | number | undefined };
}

export const ProductsContext = createContext({} as IProductsContext);

const Animator = styled(motion.div)`
  display: flex;
`;

const Footer: FC<{}> = () => {
  // Products page core context
  const { initial, limit, pagination, setPagination, isLoading, length } =
    useContext(ProductsContext);

  // Local context
  const [rotate, setRotate] = useState(0);
  const total = Math.ceil((length - initial) / limit);

  const variants = {
    rotating: {
      rotate,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        times: 1,
      },
    },
    stable: {
      rotate,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    active: {
      y: 0,
      opacity: 1,
    },
    inactive: {
      y: 0,
      opacity: 0.25,
    },
  };

  return (
    <Divider
      $alignItems="center"
      $justifyContent="center"
      $padding={{ bottom: 6 }}
    >
      {/* Load more items */}
      <AnimatePresence>
        {/* If the limit is less than 4, increase it */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          exit={{ y: 30, opacity: 0 }}
          variants={buttonVariants}
          animate={pagination + 1 < total ? "active" : "inactive"}
          transition={{ type: "spring" }}
        >
          <Button
            $variant="primary"
            key="loadMore"
            $isDisabled={!(pagination + 1 < total)}
            onClick={() => {
              if (pagination + 1 < total) {
                // Increase limit by two
                setPagination(pagination + 1);
                // Rotate each time page is synced
                setRotate(rotate + 180);
              }
            }}
          >
            <Divider
              $options={{
                additionalStyles: ({ spaces }) =>
                  `margin-right: ${spaces[1]}rem;`,
              }}
            >
              <Animator
                variants={variants}
                animate={isLoading ? "rotating" : "stable"}
              >
                <Icon $icon="sync" $color="white" $size={30} />
              </Animator>
            </Divider>
            Load more
          </Button>
        </motion.div>
      </AnimatePresence>
    </Divider>
  );
};

const Products: FC<{}> = () => {
  const dispatch = useDispatch();

  const {
    query,
    limit,
    initial,
    pagination,
    setPagination,
    filters,
    length,
    setLength,
    setIsLoading,
    products,
    setProducts,
  } = useContext(ProductsContext);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const container = useRef<HTMLDivElement>(null);

  useDebouncedEffect(
    () => {
      !isObjectEmpty(query) &&
        getItems<IProduct>({
          model: "products",
          query: { ...filters, skip: pagination, limit, initial },
          onSuccess: ({ data }) => {

            const curr = products;
            const pag = pagination > 0;

            // Check if we're handling pagination
            if (pag) setProducts([...curr, ...data.items]);
            // Populate products array
            else {
              setIsLoading(true);
              // Disable products for a while
              setProducts(undefined);
              // Then refill them
              setTimeout(() => setProducts(data.items), 500);
            }
            // Populate total length
            setLength(data.length);
            if (isLoadingMore) setIsLoadingMore(false); // Allow the load more function to happen again
          },
          setLoading: setIsLoading,
          dispatch,
        });
    },
    [query],
    250
  );

  useEffect(() => {
    let curr: number;
    let currIsLoadingMore: boolean = isLoadingMore;

    // Check if the ref is rendered
    if (container && container.current) {
      // Get the current bottom
      curr = container.current.getBoundingClientRect().bottom;

      // Get the length of all contacts converted to amount of pages
      const total = Math.ceil((length - initial) / limit);

      // Listen to page scroll
      window.onscroll = function () {
        if (
          window.innerHeight + window.pageYOffset >= curr && // when the bottom of the products is reached
          !isLoadingMore && // and the isLoading more was not reached before
          pagination + 1 < total // and if all products are not loaded yet
        ) {
          if (!currIsLoadingMore)
            // Next page
            setPagination(pagination + 1);

          // Disable additional reloads until this one is done
          currIsLoadingMore = true;
          setIsLoadingMore(true);
        }
      };
    }
  }, [, isLoadingMore, container.current]);

  return (
    <Divider $direction="column" $extends="container">
      {products ? (
        products.length > 0 ? (
          <Divider ref={container}>
            <Grid {...{ products }} />
          </Divider>
        ) : (
          <Divider
            $alignItems="center"
            $justifyContent="center"
            $options={{
              additionalStyles: () => `
                width: 100%;
              `,
            }}
          >
            <Empty
              heading="No products found"
              description="Please rearrange your filters, or try again later."
            />
          </Divider>
        )
      ) : (
        <Divider
          $alignItems="center"
          $margin={{ top: 6, bottom: 6 }}
          $padding={{ top: 6, bottom: 6 }}
          $options={{
            additionalStyles: () => `
            width: 100%;
          `,
          }}
        >
          <Loader />
        </Divider>
      )}

      {products && <Footer />}
    </Divider>
  );
};

const Explore: FC = () => {
  // Loading indicator
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isLoadingMemo = useMemo(() => isLoading, [isLoading]);

  // Product filters
  const [filters, setFilters] = useState<TFilters>({});
  const filtersMemo = useMemo(() => filters, [filters]);

  // Check if context has filters on
  const [hasFilters, setHasFilters] = useState<boolean>(false);
  const hasFiltersMemo = useMemo(() => hasFilters, [hasFilters]);

  useEffect(() => {
    const d = Object.entries(filtersMemo)
      .map(([key, val]) => val)
      .flat(1);

    const c = d.length !== 0 && !hasFilters;

    // Listen excusively only filters and turn them on when done is
    if (c) setHasFilters(true);
    else setHasFilters(false);

    // Check specifically if we should set pagination to 0 or not
    if (c) setPagination(0);
  }, [filtersMemo]);

  // Products
  const [products, setProducts] = useState<IProduct[]>();
  const productsMemo = useMemo(() => products, [products]);

  // Products length
  const [length, setLength] = useState<number>(0);
  const lengthMemo = useMemo(() => length, [length]);

  // Manage page limit and pagination
  const [pagination, setPagination] = useState(0);
  const paginationMemo = useMemo(() => pagination, [pagination]);

  // Query, manage a debounce between things happening
  const [query, setQuery] = useState<{
    [x: string]: string | string[] | undefined | number;
  }>({});

  useDebouncedEffect(
    () => {
      setQuery({ ...filters, skip: pagination });
    },
    [filters, pagination],
    75
  );

  return (
    <ProductsContext.Provider
      value={
        {
          query,
          isLoading: isLoadingMemo,
          setIsLoading,
          // Filters
          filters: filtersMemo,
          setFilters,
          hasFilters: hasFiltersMemo,
          // Pagination
          pagination: paginationMemo,
          setPagination,
          // Products
          products: productsMemo,
          setProducts,
          length: lengthMemo,
          setLength,
          limit: 3,
          initial: 6, // Usually the first page will be Initial + Limit
        } as IProductsContext
      }
    >
      <Normal title="Products">
        <Hero
          $title="Products Explorer"
          $subtitle="Search and explore all the products in our platform, with advanced filters and sorting for a better searching of your needs all in seconds."
        >
          <Search />
        </Hero>

        <Products />
      </Normal>
    </ProductsContext.Provider>
  );
};

export { Explore };
