// Core types
import { FC, useMemo } from "react";

// Core
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Vendors
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { DateTime } from "luxon";

// Global components
import { Hero, Divider, Empty } from "@components";
import { Normal } from "@components/Layouts";

// Local components
import { Ticketing } from "./Ticketing";
import { Order } from "./Order";

// Global types
import type { IOrder, Theme } from "@types";

// Global icons
import { Payment, Calendar, CouponsIcon, GiftIcon, UserIcon } from "@icons";

// Global styles
import { Animation } from "@styles";

// Global methods
import { getItems } from "@methods/getItems";

const Stat: FC<{
  $icon: any;
  $label: string;
  $delay: number;
  $style?: (e: Theme) => string;
  children: React.ReactNode;
}> = ({ $icon, $label, $delay, $style, children }) => {
  return (
    <Divider
      as={motion.div}
      initial={{ opacity: 0, y: -9 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ type: "spring", delay: $delay }}
      $alignItems="center"
      $options={{
        additionalStyles: (theme: Theme) => {
          const { spaces, colors, breakpoints } = theme;

          return `
            padding:  ${spaces[1] as number}rem;
            background-color: ${colors["white"]};
            font-size: 14.5px;
          
            border-radius: 40px;
            box-shadow: 0 0 40px rgba(0,0,0,.075);
            word-break: break-all;
            flex: 1;
            transition: box-shadow 200ms ease-in-out;
            
            &:hover {
              box-shadow: 0 0 60px rgba(0,0,0,.075);
            }


            @media (max-width: ${breakpoints["md"]}px) {
              margin-bottom: ${spaces[1]}rem;
            }

            @media (min-width: ${breakpoints["md"] + 1}px) {
              &:not(:last-of-type) {
                margin-right: ${spaces[2]}rem;  
              }
            }

            ${$style && $style(theme)}
        `;
        },
      }}
    >
      <Divider
        $alignItems="center"
        $justifyContent="center"
        $options={{
          additionalStyles: ({ colors }) => `
            background-color: ${colors["primary"]}10;
            min-width: 40px;
            min-height: 40px;
            border-radius: 30px;
          `,
        }}
      >
        {$icon}
      </Divider>

      <Divider
        $direction="column"
        $options={{
          additionalStyles: ({ spaces, font }) => `
            margin-left: ${(spaces[1] as number) * 1.5}rem;
            margin-right: ${spaces[1]}rem;
          `,
        }}
      >
        <Divider
          $options={{
            additionalStyles: ({ spaces, font }) => `
              opacity: 0.5175;
              font-size: 12.5px;
            `,
          }}
        >
          {$label}
        </Divider>
        <Divider
          $options={{
            additionalStyles: ({ spaces, font }) => `
            font-weight: ${font["weight"]["semiBold"]};
          `,
          }}
        >
          {children}
        </Divider>
      </Divider>
    </Divider>
  );
};

const Purchase: FC = () => {
  // Handle order
  const [purchase, setPurchase] = useState<IOrder | null>(null);
  const purchaseMemo = useMemo(() => purchase, [purchase]);

  // Handle order loading
  const [loading, setLoading] = useState<boolean>(true);

  // Handle if the purchase is found or not
  const [notFound, setNotFound] = useState<boolean | null>(null);
  const notFoundMemo = useMemo(() => notFound, [notFound]);

  // Render count
  const [count, setCount] = useState<number>(0);
  const countMemo = useMemo(() => count, [count]);

  const dispatch = useDispatch();
  const router = useRouter();
  const { path } = router.query;

  useEffect(() => {
    let count = countMemo;

    // Assigning interval to a variable to clear it.
    const intervalId = setInterval(() => {
      purchase?.status === "created" &&
        getItems<IOrder>({
          query: {
            target: path,
            isPublic: "true",
          },
          model: "orders",
          setLoading,
          dispatch,
          onSuccess: ({ data: { items } }) => {
            // Grab the first known item
            const [purchase] = items;
            // Store
            setPurchase(purchase);
          },
        });
    }, 1000 * 10);

    if (purchase === null)
      getItems<IOrder>({
        query: {
          target: path,
          isPublic: "true",
        },
        model: "orders",
        setLoading,
        dispatch,
        onSuccess: ({ data: { items, length } }) => {
          // Grab the first known item
          const [purchase] = items;

          // If length is bigger than 0, we have data
          if (length > 0) setPurchase(purchase);
          else setNotFound(true);

          // Disable reloading icons by increasing render count
          setTimeout(() => {
            count++;
            setCount(count);
          }, 700);
        },
      });

    return () => clearInterval(intervalId); // Important to clean interval if user scrolls back
  }, [purchase]);

  if (notFoundMemo === true) {
    return (
      <Normal title="Order not found">
        <Hero />

        <Empty
          heading="Please try again later"
          description="Please check the given URL, or ask for another one, because this order was not found."
        />
      </Normal>
    );
  }

  return (
    <Normal title="Your Order">
      <Hero
        $title={
          purchase === null
            ? "..."
            : purchase.products.length === 1
            ? "Order including 1 product"
            : "Order including " + purchase.products.length + " products"
        }
        $subtitle="This is a auto-generated order page for you, don't share this link (page or id) with others as it is anonymous and contains stealable information."
      />

      <Divider $direction="column" $padding={{ left: 3, right: 3 }}>
        <AnimatePresence mode="popLayout">
          {/* Start of Icons */}
          {loading && count == 0 ? (
            <Divider
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="loader"
              $extends="container"
              $padding={{ top: 6, xs: { top: 3 } }}
            >
              <Divider
                $options={{
                  additionalStyles: ({ colors }) => `
                    flex: 1;
                    width: 100%;
                    border-radius: 40px;
                    overflow: hidden;
                    background-color: ${colors["primary"]}10;
                  `,
                }}
              >
                <Animation
                  $style={() => `
                    width: 100%; 
                    opacity: 0.7;
                    height: 68px;
                  `}
                />
              </Divider>
            </Divider>
          ) : (
            <Divider
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="Icons"
              $extends="container"
              $direction={{ xs: "column", sm: "column", md: "row" }}
              $padding={{ top: 6, xs: { top: 3 } }}
            >
              <Divider
                $options={{
                  additionalStyles: ({ breakpoints }) => `
                    flex-wrap: wrap;
                    flex: 0 0 66.66666666%;
                  `,
                }}
                $padding={{
                  md: { right: 3 },
                }}
              >
                <Stat
                  $label="Order ID"
                  $icon={<GiftIcon $size={20} />}
                  children={purchase?.path.toString()}
                  $delay={0.05}
                  $style={({ breakpoints }) => `
                    @media (max-width: ${breakpoints["md"]}px) {
                      flex: 0 0 100%;
                    }
                  `}
                />

                <Stat
                  $label="Amount"
                  $icon={<Payment $size={20} />}
                  children={`${purchase?.cc?.local_price.amount} ${purchase?.cc?.local_price.currency}`}
                  $delay={0.1}
                  $style={({ breakpoints, spaces }) => `
                  @media (max-width: ${breakpoints["md"]}px) {
                    margin-right: ${spaces[1]}rem; 
                  }
                `}
                />

                <Stat
                  $label="Coupon code"
                  $icon={<CouponsIcon $size={20} $hasMargin={false} />}
                  children={
                    purchase?.coupon
                      ? purchase?.coupon.code
                      : "No coupon applied"
                  }
                  $delay={0.15}
                />
              </Divider>

              {/* Icons */}
              <Divider
                $options={{
                  additionalStyles: () => `
                    flex-wrap: wrap;
                    flex: 0 0 33.3333333%;
                  `,
                }}
              >
                {purchase && (
                  <Stat
                    $label="Date"
                    $icon={<Calendar $size={20} />}
                    children={`${DateTime.fromISO(
                      purchase.createdAt.toString()
                    ).toFormat("dd-M-yyyy")}`}
                    $delay={0.2}
                    $style={({ breakpoints, spaces }) => `
                      @media (max-width: ${breakpoints["md"]}px) {
                        margin-right: ${spaces[1]}rem; 
                      }
                    `}
                  />
                )}

                <Stat
                  $label="Email"
                  $icon={<UserIcon $hasMargin={false} />}
                  children={`${purchase?.email}`}
                  $delay={0.25}
                />
              </Divider>
            </Divider>
          )}

          {/* Start order containre */}
          <Divider
            key="Container"
            $extends="container"
            $direction={{ xs: "column", md: "row" }}
            $padding={{ top: 3, bottom: 6, xs: { bottom: 3 } }}
          >
            <Divider
              $direction="column"
              $padding={{
                xs: { bottom: 3 },
                sm: { right: 3 },
              }}
              $options={{
                additionalStyles: () => `
                  flex: 0 0 66.66666666%;
                `,
              }}
            >
              {loading ? (
                <Divider
                  as={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key="OrderLoader"
                >
                  <Divider
                    $options={{
                      additionalStyles: ({ colors }) => `
                        flex: 1;
                        width: 100%;
                        border-radius: 40px;
                        overflow: hidden;
                        background-color: ${colors["primary"]}10;
                      `,
                    }}
                  >
                    <Animation
                      $style={() => `
                        width: 100%; 
                        opacity: 0.7;
                        height: 450px;
                      `}
                    />
                  </Divider>
                </Divider>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -9 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ type: "spring" }}
                >
                  <Order purchase={purchase} />
                </motion.div>
              )}
            </Divider>

            <Divider
              $direction="column"
              $options={{
                additionalStyles: () => `
                  flex: 0 0 33.3333333%;
                `,
              }}
            >
              {loading ? (
                <Divider
                  as={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key="TicketLoader"
                >
                  <Divider
                    $options={{
                      additionalStyles: ({ colors }) => `
                        flex: 1;
                        width: 100%;
                        border-radius: 40px;
                        overflow: hidden;
                        background-color: ${colors["primary"]}10;
                      `,
                    }}
                  >
                    <Animation
                      $style={() => `
                        width: 100%; 
                        opacity: 0.7;
                        height: 450px;
                      `}
                    />
                  </Divider>
                </Divider>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -9 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ type: "spring", delay: 0.15 }}
                >
                  <Ticketing purchase={purchase} />{" "}
                </motion.div>
              )}
            </Divider>
          </Divider>
        </AnimatePresence>
      </Divider>
    </Normal>
  );
};

export { Purchase };
