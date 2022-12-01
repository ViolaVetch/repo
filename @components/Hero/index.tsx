// Core types
import type { FC } from "react";

// Global components
import { Divider } from "@components";

// Vendors
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Heading = styled(motion.div)<{
  $hasChildren?: boolean;
  $isSubtitle?: boolean;
}>`
  font-size: 36px;
  line-height: 40px;

  ${({ $isSubtitle, $hasChildren, theme: { spaces } }) =>
    $isSubtitle &&
    css`
      font-size: 16px;
      line-height: 24px;
      margin-top: ${spaces[1]}rem;
      margin-bottom: ${spaces[$hasChildren ? 2 : 0]}rem;
    `}
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 9;

  ${({ theme: { defaults, colors, spaces, ...theme } }) => css`
    color: ${colors.white};
    background-color: ${colors.primary};
    padding-top: ${spaces[5]}rem;
    padding-bottom: ${spaces[5]}rem;
  `}
`;

interface Hero {
  $title?: string;
  $subtitle?: string;
  children?: React.ReactNode;
}

const index: FC<Hero> = ({ $title, $subtitle, children }) => {
  return (
    <AnimatePresence>
      <Hero>
        <Divider
          $margin={{ top: 5 }}
          $padding={{ top: 5, bottom: 5 }}
          $extends="container"
        >
          <Divider $options={{ flex: 1 }}></Divider>
          <Divider
            $alignItems="center"
            $textAlign="center"
            $direction="column"
            $options={{
              additionalStyles: ({ breakpoints }) => `
              flex: 3;
              @media (max-width:${breakpoints["sm"]}px) {
                flex: 6;
              }
            `,
            }}
          >
            {$title && <Heading
              initial={{ opacity: 0, y: -9 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ type: "spring", delay: 0.15 }}
            >
              {$title}
            </Heading>}

            {$subtitle && (
              <Heading
                initial={{ opacity: 0, y: -9 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ type: "spring", delay: 0.25 }}
                $isSubtitle
                $hasChildren={Boolean(children)}
              >
                {$subtitle}
              </Heading>
            )}

            <motion.div
              initial={{ opacity: 0, y: -9 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ type: "spring", delay: 0.25 }}
            >
              {children}
            </motion.div>
          </Divider>
          <Divider $options={{ flex: 1 }}></Divider>
        </Divider>
      </Hero>
    </AnimatePresence>
  );
};

export { index as Hero };
