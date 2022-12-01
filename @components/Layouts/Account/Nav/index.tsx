// Core types
import type { FC } from "react";

// Core
import { Fragment } from "react";
import { useRouter } from "next/router";

// Vendors
import styled, { css } from "styled-components";
import { signOut, useSession } from "next-auth/react";

import {
  CategoryIcon,
  CouponsIcon,
  DashboardIcon,
  FaqsIcon,
  LogoutIcon,
  SettingsIcon,
  UserIcon,
  WalletIcon,
  CoffeIcon,
  Resellers as ResellersIcon,
  Payment,
} from "@icons";

// Global components
import { Divider, Separator } from "@components";

const Link = styled.a<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ theme: { defaults, colors, spaces } }) => css`
    padding: ${spaces[1]}rem;
    margin-top: ${(spaces[1] as number) / 2}rem;
    margin-bottom: ${(spaces[1] as number) / 2}rem;
    border-radius: ${defaults.radius}px;

    &:hover {
      background-color: ${colors["primary"]}10;
    }
  `}

  ${({ $isActive, theme: { colors } }) =>
    $isActive &&
    `
    background-color: ${colors["primary"]}15;
    &:hover {
      background-color: ${colors["primary"]}20;
    }
  `}
`;

const Text = styled.p`
  ${({ theme: { defaults, colors, spaces, ...theme } }) => css`
    margin-left: ${spaces[2]}rem;
  `}
`;

const Nav = () => {
  // Next-Auth Authentication
  const { data: session } = useSession();

  const Item: FC<{
    $path?: string;
    $icon: React.ReactNode;
    $label: string;
    onClick?: Function;
  }> = ({ $path, $icon, $label, onClick }) => {
    const router = useRouter();

    return (
      <Link
        style={{ marginTop: "0" }}
        onClick={() => (onClick ? onClick() : router.push($path ? $path : ""))}
        $isActive={router.pathname === $path}
      >
        <Divider>{$icon}</Divider>
        <Text>{$label}</Text>
      </Link>
    );
  };

  return (
    <Divider
      $options={{
        additionalStyles: ({ breakpoints }) => `
          @media (min-width: ${breakpoints["md"]}px) {
            flex: 1;
          }
          @media (max-width: ${breakpoints["sm"]}px) {
            width: 100%;
          }
      `,
      }}
      $direction="column"
      $extends="card"
    >
      {/* Admin */}
      {session && session.user.role == "admin" && (
        <>
          <Item
            $path="/account"
            $label="Dashboard"
            $icon={<DashboardIcon $size={30} />}
          />

          <Item
            $path="/account/orders"
            $label="Orders"
            $icon={<WalletIcon $size={30} />}
          />

          <Item
            $path="/account/payouts"
            $label="Payouts"
            $icon={<Payment $size={30} />}
          />

          <Item
            $path="/account/products"
            $label="Products"
            $icon={<CouponsIcon $size={30} />}
          />

          <Item
            $path="/account/coupons"
            $label="Coupons"
            $icon={<CoffeIcon $size={30} />}
          />

          <Item
            $path="/account/categories"
            $label="Categories"
            $icon={<CategoryIcon $size={30} />}
          />

          <Item
            $path="/account/pages"
            $label="Pages"
            $icon={<FaqsIcon $size={30} />}
          />

          <Item
            $path="/account/faqs"
            $label="FAQs"
            $icon={<FaqsIcon $size={30} />}
          />

          <Item
            $path="/account/users"
            $label="Users"
            $icon={<UserIcon $size={30} />}
          />

          <Item
            $path="/account/resellers"
            $label="Resellers"
            $icon={<ResellersIcon $size={30} />}
          />

          <Item
            $path="/account/settings"
            $label="Settings"
            $icon={<SettingsIcon $type="new" $size={30} />}
          />

          <Separator $axis="x" $margin={2} />

          <Item
            $path="/account/profile"
            $label="Profile"
            $icon={<UserIcon $size={30} />}
          />

          <Item
            $label="Logout"
            onClick={() => signOut()}
            $icon={<LogoutIcon $size={30} />}
          />
        </>
      )}

      {/* Resellers */}
      {session && session.user.role == "reseller" && (
        <Fragment>
          <Item
            $path="/account"
            $label="Dashboard"
            $icon={<DashboardIcon $size={30} />}
          />

          <Item
            $path="/account/orders"
            $label="Orders"
            $icon={<WalletIcon $size={30} />}
          />

          <Item
            $path="/account/payouts"
            $label="Payouts"
            $icon={<Payment $size={30} />}
          />

          <Item
            $path="/account/products"
            $label="Products"
            $icon={<CouponsIcon $size={30} />}
          />

          <Separator $axis="x" $margin={2} />

          <Item
            $label="Logout"
            onClick={() => signOut()}
            $icon={<LogoutIcon $size={30} />}
          />
        </Fragment>
      )}

      {/* Customer support */}
      {session && session.user.role == "user" && (
        <Fragment>
          <Item
            $path="/account"
            $label="Dashboard"
            $icon={<DashboardIcon $size={30} />}
          />

          <Item
            $path="/account/orders"
            $label="Orders"
            $icon={<WalletIcon $size={30} />}
          />

          <Separator $axis="x" $margin={2} />

          <Item
            $label="Logout"
            onClick={() => signOut()}
            $icon={<LogoutIcon $size={30} />}
          />
        </Fragment>
      )}
    </Divider>
  );
};

export { Nav };
