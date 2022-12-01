// Core types
import { FC, useContext } from "react";

// Vendors
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";

const Logo = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 140px;
    height: auto;
  }

  ${({ theme: { defaults, colors, font, ...theme } }) => css``}
`;

interface Logo {}

// Global types
import { Store } from "@types";
import Link from "next/link";
import { StoreContext } from "@context";

const index: FC<Logo> = () => {
  // Core instance
  const { instance: website } = useContext(StoreContext);

  return (
    <Link href="/">
      <Logo>
        <img src={website.websiteLogo} alt={website.companyName} />
      </Logo>
    </Link>
  );
};

export { index as Logo };
