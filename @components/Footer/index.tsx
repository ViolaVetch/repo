import {
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  DiscordIcon,
  InstagramIcon,
} from "@icons";

// Core
import Link from "next/link";

import { useDispatch } from "react-redux";

import { useState, useEffect, useContext } from "react";

// Vendors
import styled, { css } from "styled-components";

// Global components
import { Divider, Logo, Paragraph } from "@components";

// Global context
import { StoreContext } from "@context";
import { getItems } from "@methods/getItems";

const Heading = styled.h5`
  font-size: 24px;
  line-height: 30px;
  position: relative;

  ${({ theme: { defaults, colors, font, spaces, ...theme } }) => css`
    margin-bottom: ${spaces[3]}rem;
  `}
`;

export const Footer = () => {
  const { instance: website } = useContext(StoreContext);

  return (
    <Divider
      $background={{ color: "primary" }}
      $color="white"
      $padding={{
        top: 5,
        bottom: 5,
        xs: { left: 2, right: 2 },
        sm: { left: 2, right: 2 },
        xxl: { left: 0, right: 0 },
      }}
      $margin={{ top: "auto" }}
      $direction="column"
    >
      <Divider $extends="container" $direction={{ xs: "column", sm: "row" }}>
        <Divider
          $padding={{
            xs: { bottom: 2 },
            sm: { bottom: 2 },
            md: { bottom: 2 },
          }}
          $direction="column"
          $options={{ flex: 1.5 }}
        >
          <Divider $margin={{ bottom: 3 }}>
            <Logo />
          </Divider>

          <Paragraph>{website.websiteDescription}</Paragraph>
        </Divider>

        <Divider
          $padding={{ sm: { left: 2, right: 2 } }}
          $direction="column"
          $options={{ flex: 1 }}
        >
          <Heading>Helpful Links</Heading>
          {website["pages"].map((page: any, index: number) => {
            if (index < 4)
              return (
                <Link key={index} href={`/page/${page.path}`}>
                  <Divider
                    as="a"
                    $options={{
                      additionalStyles: () => `
                          cursor: pointer;
                        `,
                    }}
                  >
                    {page.title}
                  </Divider>
                </Link>
              );
          })}
        </Divider>

        <Divider $options={{ flex: 1 }}></Divider>
      </Divider>

      <Divider
        $extends="container"
        $margin={{ top: 4 }}
        $padding={{ top: 4 }}
        $options={{
          additionalStyles: ({ colors }) => `
            border-top: 1px solid ${colors["border"]}10;
          `,
        }}
      >
        &copy; {new Date().getFullYear()} {website.companyName}
      </Divider>
    </Divider>
  );
};
