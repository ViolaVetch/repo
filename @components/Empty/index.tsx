// Core types
import type { FC } from "react";
// Core
import { useContext } from "react";

// Global context
import { StoreContext } from "@context";

// Vendors
import styled, { css } from "styled-components";

import { Divider, Heading } from "@components";

const Primary = styled.path`
  ${({ theme: { colors } }) => css`
    fill: ${colors["primary"]};
  `}
`;

const Illustration = styled.svg<{ $size?: "small" | "medium" }>`
  ${({ $size }) =>
    $size === "small"
      ? css`
          width: 150px;
          max-width: 210px;
        `
      : css`
          width: 300px;
          max-width: 350px;
        `}
`;

export const Empty: FC<{
  heading?: string;
  description?: string;
  $size?: "small" | "medium";
  [x: string]: any;
}> = ({ heading, description, $size }) => {
  return (
    <Divider
      $direction="column"
      $alignItems="center"
      $justifyContent="center"
      $textAlign="center"
      $padding={{ top: 6, bottom: 6, left: 3, right: 3 }}
      $options={{
        additionalStyles: () => `
        `,
      }}
    >
      <Illustration
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 712.67 603.321"
        $size={$size}
      >
        <g transform="translate(-876.188 538.812)">
          <path
            d="M1381.628-536.819c113.271,0,205.238,91.967,205.238,205.238S1494.9-126.343,1381.628-126.343s-205.237-91.967-205.237-205.238S1268.358-536.819,1381.628-536.819Z"
            fill="rgba(0,0,0,0)"
            stroke="#d8dcf0"
            strokeMiterlimit="7.97"
            strokeDashoffset="6.145"
            strokeWidth="3.985"
            strokeDasharray="19.926"
          />
          <path
            d="M1363.4-334.838v138.51a37.667,37.667,0,0,1-37.665,37.665H983.108a37.5,37.5,0,0,1-24.3-8.894,37.587,37.587,0,0,1-13.365-28.771v-138.51a37.589,37.589,0,0,1,13.365-28.772,37.5,37.5,0,0,1,24.3-8.893h342.63A37.666,37.666,0,0,1,1363.4-334.838Z"
            fill="#fff"
          />
          <path
            d="M1363.4-334.838v138.51a37.667,37.667,0,0,1-37.665,37.665H983.108a37.5,37.5,0,0,1-24.3-8.894,37.587,37.587,0,0,1-13.365-28.771v-138.51a37.589,37.589,0,0,1,13.365-28.772,37.5,37.5,0,0,1,24.3-8.893h342.63A37.666,37.666,0,0,1,1363.4-334.838Z"
            fill="rgba(0,0,0,0)"
            stroke="#efefef"
            strokeMiterlimit="9.72"
            strokeWidth="2.43"
          />
          <Primary d="M958.808-363.61v196.053a37.587,37.587,0,0,1-13.365-28.771v-138.51A37.589,37.589,0,0,1,958.808-363.61Z" />
          <path
            d="M1009.838-293.528h109.35a7.289,7.289,0,0,1,7.29,7.29,7.29,7.29,0,0,1-7.29,7.29h-109.35a7.29,7.29,0,0,1-7.29-7.29A7.29,7.29,0,0,1,1009.838-293.528Z"
            fill="#e3e3e3"
          />
          <path
            d="M1009.838-249.788h262.44a7.289,7.289,0,0,1,7.29,7.29,7.29,7.29,0,0,1-7.29,7.29h-262.44a7.29,7.29,0,0,1-7.29-7.29A7.29,7.29,0,0,1,1009.838-249.788Z"
            fill="#f1f1f1"
          />
          <path
            d="M1429.013-211.557v138.51a37.666,37.666,0,0,1-37.665,37.665h-342.63a37.5,37.5,0,0,1-24.3-8.894,37.587,37.587,0,0,1-13.365-28.771v-138.51a37.585,37.585,0,0,1,13.365-28.771,37.5,37.5,0,0,1,24.3-8.894h342.63A37.666,37.666,0,0,1,1429.013-211.557Z"
            fill="#fff"
          />
          <path
            d="M1429.013-211.557v138.51a37.666,37.666,0,0,1-37.665,37.665h-342.63a37.5,37.5,0,0,1-24.3-8.894,37.587,37.587,0,0,1-13.365-28.771v-138.51a37.585,37.585,0,0,1,13.365-28.771,37.5,37.5,0,0,1,24.3-8.894h342.63A37.666,37.666,0,0,1,1429.013-211.557Z"
            fill="rgba(0,0,0,0)"
            stroke="#efefef"
            strokeMiterlimit="9.72"
            strokeWidth="2.43"
          />
          <Primary d="M1024.418-240.328V-44.276a37.587,37.587,0,0,1-13.365-28.771v-138.51A37.585,37.585,0,0,1,1024.418-240.328Z" />
          <path
            d="M1075.448-170.247H1184.8a7.289,7.289,0,0,1,7.29,7.29,7.29,7.29,0,0,1-7.29,7.29h-109.35a7.29,7.29,0,0,1-7.29-7.29A7.29,7.29,0,0,1,1075.448-170.247Z"
            fill="#e3e3e3"
          />
          <path
            d="M1075.448-126.507h262.44a7.289,7.289,0,0,1,7.29,7.29,7.29,7.29,0,0,1-7.29,7.29h-262.44a7.29,7.29,0,0,1-7.29-7.29A7.29,7.29,0,0,1,1075.448-126.507Z"
            fill="#f1f1f1"
          />
          <path
            d="M1461.818-372.891v-7.29h-4.86v7.29h-7.29v4.86h7.29v7.29h4.86v-7.29h7.29v-4.86Z"
            fill="#efefef"
          />
          <path
            d="M1301.438-478.6a8.5,8.5,0,0,1,8.505,8.505,8.5,8.5,0,0,1-8.505,8.505,8.505,8.505,0,0,1-8.505-8.505A8.505,8.505,0,0,1,1301.438-478.6Z"
            fill="rgba(0,0,0,0)"
            stroke="#efefef"
            strokeMiterlimit="9.72"
            strokeWidth="2.43"
          />
          <path
            d="M1077.878-459.156a8.5,8.5,0,0,1,8.505,8.505,8.5,8.5,0,0,1-8.505,8.505,8.505,8.505,0,0,1-8.505-8.505A8.505,8.505,0,0,1,1077.878-459.156Z"
            fill="rgba(0,0,0,0)"
            stroke="#efefef"
            strokeMiterlimit="9.72"
            strokeWidth="2.43"
          />
          <path
            d="M885.908-278.121a9.72,9.72,0,0,1,9.72,9.72,9.72,9.72,0,0,1-9.72,9.72,9.721,9.721,0,0,1-9.72-9.72A9.721,9.721,0,0,1,885.908-278.121Z"
            fill="#efefef"
          />
          <path
            d="M929.648-18.111V-25.4h-4.86v7.29H917.5v4.86h7.29v7.29h4.86v-7.29h7.29v-4.86Z"
            fill="#efefef"
          />
          <path
            d="M1216.388,46.284a8.5,8.5,0,1,1-8.5,8.505A8.5,8.5,0,0,1,1216.388,46.284Z"
            fill="rgba(0,0,0,0)"
            stroke="#efefef"
            strokeMiterlimit="9.72"
            strokeWidth="2.43"
          />
          <path
            d="M1498.268-91.011a9.72,9.72,0,0,1,9.72,9.72,9.72,9.72,0,0,1-9.72,9.72,9.721,9.721,0,0,1-9.72-9.72A9.721,9.721,0,0,1,1498.268-91.011Z"
            fill="#efefef"
          />
        </g>
      </Illustration>

      {heading && (
        <Divider
          $options={{
            additionalStyles: () => `
              font-size: 32px;
              line-height: 50px;
            `,
          }}
        >
          {heading}
        </Divider>
      )}

      {description && (
        <Heading
          $options={{
            additionalStyles: ({ spaces }) => `
            margin-top: ${(spaces[1] as number) * 1}rem;
            margin-bottom: ${(spaces[1] as number) * 1.5}rem;
            line-height: 1.5;
            opacity: 0.485;
          `,
          }}
        >
          {description}
        </Heading>
      )}
    </Divider>
  );
};
