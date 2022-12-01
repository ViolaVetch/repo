// Global containers
import { Account } from "@components/Layouts";

// Core
import { type FC, useEffect, useState, useMemo } from "react";

// Vendors
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

// Global styles
import { Animation } from "@styles";

// Local components
import { Box } from "./Box";

// Global componentts
import { Header } from "@components/Account";
import { Divider } from "@components/Divider";
import { getItems } from "@methods/getItems";

// Global types
import { IStat } from "@types";
import { Dropdown } from "@components";
import { useDebouncedEffect } from "@utils/client";

const Container = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
export type TFilters = {
  search?: string;
  status?: string | string[];
  period?: string | string[];
  sellers?: string | string[];
};

export const Dashboard = () => {
  const [stats, setStats] = useState<IStat[] | null>(null);
  const [length, setLength] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<TFilters>({});
  const filtersMemo = useMemo(() => filters, [filters]);

  const dispatch = useDispatch();

  useDebouncedEffect(
    () =>
      getItems<IStat>({
        query: filtersMemo,
        // query: {},
        onSuccess: ({ data }) => {
          // Store length
          setLength(data["length"]);

          // Stall for 800ms and then validate
          setStats(data["items"]);
        },
        setLoading,
        dispatch,
        timeout: 800,
        model: "stats",
      }),
    [filters],
    100
  );

  return (
    <Account>
      <Header $title="Dashboard">
        <Divider>
          <Dropdown
            $placeholder="Period"
            $type="prepopulate"
            $name="period"
            $options={{ limit: 6 }}
            $select="single"
            $populate={[
              { label: "Today", value: "today" },
              { label: "Last week", value: "last-week" },
              { label: "Last month", value: "last-month" },
              { label: "Last year", value: "last-year" },
            ]}
            $onUpdate={(items) => {
              // Do nothing if items don't exist
              if (!items) return;

              // Exclude sellers from filters
              const { period, ...df } = filters;

              // Insert items if there are any, remove object key entirely if there's none
              setFilters(
                items.length > 0 ? { ...filters, period: items } : { ...df }
              );
            }}
          />
        </Divider>
      </Header>

      <Divider
        $options={{
          additionalStyles: () => `
            display: flex;
            flex-wrap: wrap;
          `,
        }}
      >
        <AnimatePresence mode="popLayout">
          {loading ? (
            <Container
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Divider
                $options={{
                  additionalStyles: () => `
                    flex-wrap: wrap;
                    width: 100%;
                  `,
                }}
              >
                {Array.from(Array(length).keys()).map((el) => (
                  <Animation
                    key={el}
                    $style={({ spaces, breakpoints }) => `
                      width: calc(33.33333% - ${
                        ((spaces[2] as number) * 2) / 3
                      }rem);
                      height: 86px;
                      border-radius: 24px;
                      margin-bottom: ${spaces[2]}rem;

                      @media (max-width: ${breakpoints["lg"]}px) {
                        flex: 0 0 calc(50% - ${
                          ((spaces[2] as number) * 2) / 3
                        }rem);

                        &:not(:nth-of-type(2n)) {
                          margin-right: ${spaces[2]}rem;
                        }
                      }
            
                      @media (min-width: ${breakpoints["lg"]}px) {
                        &:not(:nth-of-type(3n)) {
                          margin-right: ${spaces[2]}rem;
                        }
                      }
                      
                    `}
                  />
                ))}
              </Divider>
            </Container>
          ) : (
            <Container
              key="loaded"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
            >
              {stats?.map((el, n) => (
                <Box {...el} key={n} />
              ))}
            </Container>
          )}
        </AnimatePresence>
      </Divider>
    </Account>
  );
};
