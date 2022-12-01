// Core types
import type { FC } from "react";

// Global components
import { Divider, Heading } from "@components";

interface Header {
  $title: string;
  children?: React.ReactNode;
}

const index: FC<Header> = ({ children, $title }) => {
  return (
    <Divider
      $alignItems={{ md: "center" }}
      $margin={{ bottom: 3 }}
      $direction={{ xs: "column", sm: "column", md: "row" }}
      $options={{
        additionalStyles: () => `
          min-height: 54px;
          flex-wrap: wrap;
        `,
      }}
    >
      <Heading
        $as="h4"
        $options={{
          additionalStyles: ({ breakpoints, spaces }) => `
            @media (max-width: ${breakpoints["lg"]}px) {
              margin-bottom: ${spaces[1]}rem;
            }
          `,
        }}
      >
        {$title}
      </Heading>

      {children && (
        <Divider
          $alignItems={{ md: "center" }}
          $margin={{ md: { left: "auto" } }}
          $direction={{ xs: "column", sm: "column", md: "row" }}
          $options={{
            additionalStyles: () => `flex-wrap: wrap;`,
          }}
        >
          {children}
        </Divider>
      )}
    </Divider>
  );
};

export { index as Header };
