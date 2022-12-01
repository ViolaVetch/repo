// Core types
import { FC, useMemo } from "react";
import { useRouter } from "next/router";

// Core
import { useState, useEffect } from "react";

// Vendors
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

// Global components
import { Divider, Hero, Loader, Empty } from "@components";
import { Normal } from "@components/Layouts";

// Global controllers
import { getItems } from "@methods/getItems";

// Global types
import { IPage } from "@types";

const Page: FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<IPage | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    query: { path },
  } = useRouter();

  useEffect(() => {
    if (page === null)
      getItems<IPage>({
        model: "pages",
        query: { path },
        setLoading,
        dispatch,
        onSuccess: ({ data }) => {
          if (data["length"] === 0) {
            setNotFound(true);
          } else {
            const [item] = data["items"];
            setPage(item);
          }
        },
      });
  }, [page]);

  const [notFound, setNotFound] = useState(false);
  const notFoundMemo = useMemo(() => notFound, [notFound]);

  if (notFoundMemo === true) {
    return (
      <Normal title="Page not found">
        <Hero />

        <Empty
          heading="Please try again later"
          description="Please check the given URL, or ask for another one, because this page was not found."
        />
      </Normal>
    );
  }

  return (
    <Normal title={page === null ? "Loading..." : page.title + " - Cryptopon"}>
      {page === null || loading ? (
        <Divider $padding={{ top: 6, bottom: 6 }}>
          <Loader />
        </Divider>
      ) : (
        <>
          <Hero $title={page.title} $subtitle={page.description} />

          <AnimatePresence>
            <Divider
              $direction="column"
              $extends="container"
              $padding={{ top: 6, bottom: 6, xs: { left: 2, right: 2 } }}
            >
              <motion.div
                initial={{ opacity: 0, y: -9 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ type: "spring", delay: 0.1 }}
              >
                <Divider
                  $margin={{ bottom: 1 }}
                  $options={{
                    additionalStyles: () => `
                    font-size: 32px;
                    line-height: 40px;
                  `,
                  }}
                >
                  {page.title}
                </Divider>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -9 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ type: "spring", delay: 0.21 }}
              >
                <Divider
                  $options={{
                    additionalStyles: () => `white-space: pre-line;`,
                  }}
                >
                  {page.content}
                </Divider>
              </motion.div>
            </Divider>
          </AnimatePresence>
        </>
      )}
    </Normal>
  );
};

export { Page };
