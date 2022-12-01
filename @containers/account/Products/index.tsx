// Core
import type { FC } from "react";

// Core
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

// Vendors
import styled from "styled-components";
import { DateTime } from "luxon";
import { useSession } from "next-auth/react";

// Table component
import { Table, Row } from "@components/Table";

// Global controllers
import SiteConfig from "configs/Site.config";

// Global components
import { Divider } from "@components";
import { Account } from "@components/Layouts";

// Local components
import { Filters } from "./Filters";

// Global types
import {
  IProduct as ProductType,
  User,
  Column as ColumnType,
  IProduct,
} from "@types";

// Global icons
import { ErrorIcon, SuccessIcon, ThumbnailIcon } from "@icons";
import { Header } from "@components/Account";

const Product: FC<ProductType> = ({
  _id,
  owner,
  name,
  createdAt,
  visibility,
  views,
  thumbnail,
  codes,
}) => {
  // Initialise router
  const router = useRouter();

  // Auth session
  const { data: session } = useSession();

  // Define owner types
  let o = owner as User;

  // Count codes length
  const countQuantity = codes.length;

  // Display owner row based on session's user role
  const ownerRow: ColumnType[] =
    session?.user.role === "admin"
      ? [
          {
            value: `${o.firstName} ${o.lastName}`,
            size: "small",
          },
        ]
      : [];

  // Display thumbnail
  const Thumbnail: FC = () => {
    return (
      <Divider
        $alignItems="center"
        $justifyContent="center"
        $padding={{ right: 2, left: 2, top: 4, bottom: 4 }}
        $options={{
          additionalStyles: ({ defaults, colors }) => `
            border-radius: ${defaults["radius"]}px;
            min-height: 80px;
            height: 100%;
            width: 100%;
            margin-right: 15px;
            background: ${colors["border"]};
            font-size: 12px;
            flex-direction: column;
            flex-wrap: wrap;
            background-size: cover;
            background-position: center;
            ${thumbnail && `background-image: url(${thumbnail});`}
          `,
        }}
      >
        {!thumbnail && (
          <Fragment>
            <ThumbnailIcon color="#ABABAB" size="1.5em" />

            <Divider
              $options={{
                additionalStyles: ({ spaces }) =>
                  `padding-left: ${(spaces[1] as number) / 2}rem;
              word-break: break-all;`,
              }}
            >
              No Thumbnail
            </Divider>
          </Fragment>
        )}
      </Divider>
    );
  };

  // Display status
  const Status: FC = () => {
    return (
      <Fragment>
        {visibility ? <SuccessIcon $size={20} /> : <ErrorIcon $size={20} />}

        <Divider
          $options={{
            additionalStyles: ({ spaces }) =>
              `padding-left: ${(spaces[1] as number) / 2}rem;`,
          }}
        >
          {visibility ? "Published" : "Unpublished"}
        </Divider>
      </Fragment>
    );
  };

  return (
    <Row
      $width={{
        xs: 800,
        sm: 1000,
      }}
      onClick={() => router.push(`/account/products/${_id}`)}
      columns={[
        {
          value: `${_id.toString().substr(0, 3)}...`,
          size: "smallest",
        },
        {
          children: <Thumbnail />,
          size: "small",
        },
        {
          value: name,
          size: "small",
        },
        {
          children: <Status />,
          size: "small",
        },
        {
          value: `${countQuantity === 0 ? "0" : countQuantity}`,
          size: "small",
        },
        {
          value: `${views}`,
          size: "small",
        },
        ...ownerRow,
        {
          value: `${
            createdAt && DateTime.fromISO(createdAt.toString()).toRelative()
          }`,
          size: "small",
        },
      ]}
    />
  );
};

export type TFilters = {
  search?: string;
  visibility?: string | string[];
  categories?: string | string[];
  sellers?: string | string[];
};

export const Products = () => {
  // Auth session
  const { data: session } = useSession();

  const [filters, setFilters] = useState<TFilters>({});

  const fetchQuery: {} | undefined = session
    ? session.user.role === "reseller" && {
        owner: session?.user._id,
      }
    : undefined;

  return (
    <Account>
      <Header $title="Products">
        <Filters filters={filters} setFilters={setFilters} />
      </Header>

      <Divider
        $direction="column"
        $options={{ additionalStyles: () => `width: 100%;` }}
      >
        <Table<IProduct>
          footerMessage={(item, second, isLoading) =>
            isLoading ? "Fetching ..." : `${second} product(s) found`
          }
          getItemsUrl={`${SiteConfig.API}/products`}
          filters={filters}
          fetchQuery={fetchQuery}
        >
          {({ updatedItems }) => {
            const owner: any =
              session?.user.role === "admin"
                ? [
                    {
                      value: "Owner",
                      size: "small",
                    },
                  ]
                : [];

            return (
              <Divider $direction="column">
                <Row
                  $width={{
                    xs: 800,
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
                      value: "Image",
                      size: "small",
                    },
                    {
                      value: "Product name",
                      size: "small",
                    },
                    {
                      value: "Status",
                      size: "small",
                    },
                    {
                      value: "Quantity",
                      size: "small",
                    },
                    {
                      value: "Views",
                      size: "small",
                    },
                    ...owner,
                    {
                      value: "Date & Time",
                      size: "small",
                    },
                  ]}
                />

                {Array.isArray(updatedItems) &&
                  updatedItems.map((product) => (
                    <Product key={product._id.toString()} {...product} />
                  ))}
              </Divider>
            );
          }}
        </Table>
      </Divider>
    </Account>
  );
};
