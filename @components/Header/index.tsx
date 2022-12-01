// Core
import Link from "next/link";
import { useRouter } from "next/router";

// Core types
import { FC, Fragment } from "react";

// Icons
import { UserIcon, HomeIcon, SearchIcon, FaqsIcon, CartIcon } from "@icons";

// GLobal types
import { Store } from "@types";

// Global components
import { Divider, Logo } from "@components";

// Vendors
import styled, { css } from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const Toggler = styled.div`
  width: 40px;
  margin-bottom: 8px;

  ${({ theme: { colors, defaults } }) => css`
    border-radius: ${defaults.radius}px;
    border-bottom: 3px solid ${colors.white};
  `}
`;

const Space = styled.div`
  ${({ theme: { breakpoints, spaces } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      min-height: 65px;
    }
    @media (max-width: ${breakpoints.lg}px) {
      min-height: 78px;
    }
    @media (min-width: ${breakpoints.lg}px) {
      min-height: 72px;
    }
  `}
`;

const Item = styled.a<{ $isActive: boolean }>`
  display: flex;
  align-items: center;

  ${({ $isActive }) =>
    $isActive &&
    `
        background: #ffffff15;
    `}

  ${({ theme: { defaults, breakpoints, spaces } }) => css`
    border-radius: ${defaults.radius}px;
    padding: ${spaces[1]}rem;

    @media (max-width: ${breakpoints.md}px) {
      margin-bottom: ${(spaces[1] as number) / 2}rem;
    }

    @media (min-width: ${breakpoints.md}px) {
      margin-left: ${spaces[1]}rem;
    }
  `}

  &:hover {
    transition: ease-in-out all 0.3s;
    cursor: pointer;
    background: #ffffff15;
  }
`;

const Label = styled.div`
  ${({ theme: { colors, spaces } }) => css`
    color: ${colors.white};
    margin-left: ${spaces[1]}rem;
  `}
`;

const Navigation: FC = () => {
  const router = useRouter();
  // Cart state
  const cart = useSelector((state: Store) => state.cart);

  // Next-Auth Authentication
  const { data: session } = useSession();

  return (
    <>
      <Link href="/">
        <Item $isActive={router.pathname === "/"}>
          <SearchIcon $color="white" $size={30} />
          <Label>Products</Label>
        </Item>
      </Link>

      <Link href="/faqs">
        <Item $isActive={router.pathname === "/faqs"}>
          <FaqsIcon $color="white" $size={30} />
          <Label>FAQs</Label>
        </Item>
      </Link>

      <Link href="/cart">
        <Item $isActive={router.pathname === "/cart"}>
          <CartIcon $color="white" $size={30} />

          <Label>
            Cart
            {cart.itemsInCart.length === 0
              ? ""
              : `(${cart.itemsInCart.length})`}
          </Label>
        </Item>
      </Link>

      {/**
       * Fix conditional rendering below,
       * when Sign-in should be uncommented
       * */}
      {session && (
        <Link href="/account">
          <Item $isActive={router.pathname === "/account"}>
            <UserIcon $color="white" $size={30} />
            <Label>
              {session.user
                ? session.user.firstName + " " + session.user.lastName
                : "Account"}
            </Label>
          </Item>
        </Link>
      )}

      {/* 
        (
          <Fragment>
            <Link href="/auth">
              <Item $isActive={router.pathname === "/auth"}>
                <UserIcon $color="white" $size={30} />
                <Label>Sign-in</Label>
              </Item>
            </Link>
          </Fragment>
        )
       */}
    </>
  );
};

export const Header = () => {
  // Disable navigation by default
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <Space />

      <Divider
        $alignItems="center"
        $background={{ color: "primary" }}
        $padding={2}
        $options={{
          additionalStyles: ({ breakpoints }) => `
            width: 100%;
            z-index: 10;
            position: absolute;
            top: 0;
            left: 0;    

            @media (max-width: ${breakpoints["md"]}px) {
              min-height: 65px;
            }
            @media (max-width: ${breakpoints["lg"]}px) {
              min-height: 78px;
            }
            @media (min-width: ${breakpoints["lg"]}px) {
              min-height: 72px;
            }
        `,
        }}
      >
        <Divider $extends="container">
          <Divider
            $options={{
              additionalStyles: ({ breakpoints }) => `
                z-index: 3;
              `,
            }}
          >
            <Logo />
          </Divider>

          {/* Desktop menu */}
          <Divider
            $margin={{ left: "auto" }}
            $options={{
              additionalStyles: ({ breakpoints }) => `
                @media (max-width: ${breakpoints.md}px){
                    display: none;
                }
            `,
            }}
          >
            <Navigation />
          </Divider>
        </Divider>

        {/* Mobile toggler */}
        <Divider
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          $direction="column"
          $margin={{ left: "auto" }}
          $options={{
            additionalStyles: ({ breakpoints }) => `
            cursor: pointer;
            z-index: 2;
            @media (min-width: ${breakpoints.md}px){
                display: none;
            }
          `,
          }}
        >
          <Toggler />
          <Toggler />
          <Toggler />
        </Divider>

        {/* Mobile menu */}
        {isOpen && (
          <Divider
            $direction="column"
            $options={{
              additionalStyles: ({ colors, breakpoints, spaces }) => `
            width: 100%;
            position: absolute;
            top: 0;
            opacity: 0.85;
            left: 0;
            z-index: 1;
            padding: 70px ${spaces[2]}rem ${spaces[2]}rem ${spaces[2]}rem;
            background-color: ${colors.primary};
            
            @media (min-width: ${breakpoints.md}px){
                display: none;
            }
          `,
            }}
          >
            <Navigation />
          </Divider>
        )}
      </Divider>
    </Fragment>
  );
};
