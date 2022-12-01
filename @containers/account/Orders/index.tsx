// Core types
import type { FC } from "react";

// Core
import { useState, Fragment, createContext } from "react";
import { useRouter } from "next/router";

// Global components
import { Account } from "@components/Layouts";
import { Divider } from "@components";

// Table component
import { Table, Row } from "@components/Table";

// Vendors
import { DateTime } from "luxon";

// Local components
import { Filters } from "./Filters";

// Global controllers
import SiteConfig from "configs/Site.config";

// Global types
import { ICoupon, IOrder, IOrderProduct } from "@types";
import { Header } from "@components/Account";
import { formatCurrency } from "@utils/shared";

const Time: FC<{ createdAt: string }> = ({ createdAt }) => {
  return (
    <Divider $direction="column">
      <Divider
        $options={{
          additionalStyles: ({ colors }) => `
            color: ${colors["grey"]};
            font-size: 12px;
          `,
        }}
      >{`${DateTime.fromISO(createdAt)}`}</Divider>
      <Divider>{DateTime.fromISO(createdAt).toRelative()}</Divider>
    </Divider>
  );
};

const Product: FC<{ products: IOrderProduct[] }> = ({ products }) => {
  return (
    <Divider $direction="column">
      {products?.map(({ name, variants }, index: number) => {
        const sum = variants.reduce((prev: number, next) => {
          if (prev) {
            return prev + next.quantity;
          } else {
            return next.quantity;
          }
        }, 0);

        return (
          <Divider
            key={index}
            $alignItems="center"
            $options={{
              additionalStyles: ({ spaces }) => `
                margin-bottom: ${(spaces[1] as number) / 2}rem;
              `,
            }}
          >
            <Divider
              $alignItems="center"
              $justifyContent="center"
              $options={{
                additionalStyles: ({ colors, font, spaces }) => `
                  color: ${colors["secondary"]};
                  font-weight: ${font["weight"]["semiBold"]};
                  margin-right: ${(spaces[1] as number) / 1.5}rem;
                `,
              }}
            >
              {sum}X
            </Divider>{" "}
            {name}
          </Divider>
        );
      })}
    </Divider>
  );
};

export const Payment: FC<{
  $type?: "amount" | "none";
  $coupon?: ICoupon | null;
  $products?: IOrderProduct[];
  $status?: string;
}> = ({ $status, $type = "none", $products, $coupon }) => {
  const reducedPrice = $products?.reduce((prev, next) => {
    const count = next.variants.reduce((prev, next) => {
      const count = next["quantity"] * next["price"];
      return prev + count;
    }, 0);

    return prev + count;
  }, 0);

  switch ($type) {
    case "amount":
      return (
        <>
          {reducedPrice &&
            formatCurrency({
              amount: $coupon
                ? (
                    reducedPrice -
                    reducedPrice *
                      (parseFloat($coupon["sale"].toString()) / 100)
                  ).toString()
                : reducedPrice?.toString(),
            })}
        </>
      );

    default:
      switch ($status) {
        case "confirmed":
          return (
            <Divider $alignItems="center" $color="success">
              Paid
            </Divider>
          );
        case "pending":
          return (
            <Divider $alignItems="center" $color="primary">
              Processing
            </Divider>
          );
        case "created":
          return (
            <Divider $alignItems="center" $color="pending">
              Unpaid
            </Divider>
          );
        case "failed":
          return (
            <Divider $alignItems="center" $color="danger">
              Failed
            </Divider>
          );
        case "unfulfilled":
          return (
            <Divider $alignItems="center" $color="secondary">
              <strong>Unfulfilled</strong>
            </Divider>
          );
        default:
          return <></>;
      }
  }
};

export type TFilters = {
  search?: string;
  status?: string | string[];
  period?: string | string[];
  sellers?: string | string[];
};

export const Orders = () => {
  const [filters, setFilters] = useState<TFilters>({});

  // Router
  const router = useRouter();

  return (
    <Account>
      <Header $title="Orders">
        <Filters filters={filters} setFilters={setFilters} />
      </Header>

      <Divider
        $direction="column"
        $options={{ additionalStyles: () => `width: 100%;` }}
      >
        <Table<IOrder>
          footerMessage={(first, second, isLoading) =>
            isLoading ? `Fetching ...` : `${second} order(s) found`
          }
          $limit={6}
          getItemsUrl={`${SiteConfig.API}/orders`}
          filters={filters}
        >
          {({ updatedItems }) => (
            <Divider $direction="column">
              <Row
                $width={{
                  xs: 1000,
                  sm: 1000,
                }}
                $type="head"
                onClick={() => {}}
                columns={[
                  {
                    value: "ID",
                    size: "smallest",
                  },
                  {
                    value: "Email",
                    size: "medium",
                  },
                  {
                    value: "Created",
                    size: "medium",
                  },
                  {
                    value: "Products",
                    size: "medium",
                  },
                  {
                    value: "Payment Status",
                    size: "small",
                  },
                  {
                    value: "Order Total",
                    size: "small",
                  },
                ]}
              />

              {Array.isArray(updatedItems) &&
                updatedItems.map(
                  ({ _id, email, products, createdAt, status, cc }, index) => (
                    <Fragment key={index}>
                      <Row
                        $width={{
                          xs: 1000,
                          sm: 1000,
                        }}
                        onClick={() => router.push(`/account/orders/${_id}`)}
                        columns={[
                          {
                            value: `${_id.toString().substr(0, 3)}..`,
                            size: "smallest",
                          },
                          {
                            children: (
                              <Divider>
                                {email?.length > 12
                                  ? `${email.substr(0, 20)}...`
                                  : email}
                              </Divider>
                            ),
                            size: "medium",
                          },
                          {
                            children: (
                              <Time {...{ createdAt: createdAt.toString() }} />
                            ),
                            size: "medium",
                          },
                          {
                            children: <Product {...{ products }} />,
                            size: "medium",
                          },
                          {
                            children: (
                              <Payment $status={status} $products={products} />
                            ),
                            size: "small",
                          },
                          {
                            children: (
                              <Payment
                                $type="amount"
                                $status={status}
                                $products={products}
                              />
                            ),
                            size: "small",
                          },
                        ]}
                      />
                    </Fragment>
                  )
                )}
            </Divider>
          )}
        </Table>
      </Divider>
    </Account>
  );
};
