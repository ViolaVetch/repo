// Core types
import { FC } from "react";

// Core
import { Fragment, useState, useContext, useRef, useEffect } from "react";

// Vendors
import styled, { css } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

// Global components
import { Divider } from "@components";

// Local component
import { Search } from "./Search";
import { Item } from "./Item";

// Local context
import { DropdownContext } from "@components/Dropdown";

// Global icons
import { Sync } from "@icons";

// Global styles
import { Triangle } from "@styles";
import { Icon } from "@components/Icon";

const Animator = styled(motion.div)`
  display: flex;
`;

const Button = styled.button<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  user-select: none;

  ${({ theme: { colors } }) =>
    css`
      background-color: ${colors["primary"]};
      color: ${colors["white"]};
    `}

  ${({ $isActive, theme: { colors } }) =>
    $isActive
      ? css`
          opacity: 1;
          cursor: pointer;
        `
      : css`
          cusor: not-allowed;
          background-color: ${colors["primary"]}90;
        `}
`;

interface Popup {}

const index: FC<Popup> = () => {
  const container = useRef<HTMLDivElement>(null);

  const {
    $search,
    $type,
    $select,
    length,
    updatedItems,
    limit,
    isLoading,
    customLimit,
    setLimit,
    setIsOpen,
  } = useContext(DropdownContext);

  // Manage current rotation process
  const [rotate, setRotate] = useState(0);

  const variants = {
    rotating: {
      rotate,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        times: 1,
      },
    },
    stable: {
      rotate,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    active: {
      y: 0,
      opacity: 1,
    },
    inactive: {
      y: 0,
      opacity: 0.25,
    },
  };

  // Handle ref
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container && container.current) {
      container.current.scrollTop = container.current.scrollHeight;
    }

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [, updatedItems]);

  const handleClickOutside = (event: { target: any }) => {
    if (ref.current && !ref.current?.contains(event.target)) {
      setIsOpen(false);
    }
  };

  return (
    <Divider
      ref={ref}
      $options={{
        additionalStyles: ({ colors, breakpoints }) => `
            position: absolute;
            top: calc(100% - 2px);
            width: 175%;
            z-index: 100;
            color: ${colors["grey"]};
            min-width: 190px;
            width: 100%;
            left: 0;
            @media (min-width: ${breakpoints["md"]}px) {
              width: 175%;
              left: -37.5%;
            }
        `,
      }}
    >
      <Triangle />

      <Divider
        $direction="column"
        $options={{
          additionalStyles: ({ spaces }) => `
            width: 100%;
            background-color: white;
            border-radius: 30px;
            box-shadow: 0 0 40px rgba(0,0,0,.15);
            transition: all 200ms ease-in-out;
            padding: ${(spaces[1] as number) * 1.5}rem;
          `,
        }}
      >
        {$search && <Search />}

        <Divider
          ref={container}
          $direction="column"
          $options={{
            additionalStyles: ({ spaces }) => `
              margin-top: ${spaces[1]}rem;
              margin-bottom: ${spaces[1]}rem;

              overflow: hidden;
              overflow-y: scroll;

              ::-webkit-scrollbar {
                width: 6px; 
                border-radius: 12px;
              }

              /* Track */
              ::-webkit-scrollbar-track {
                background: #f1f1f1; 
                border-radius: 12px;
              }

              /* Handle */
              ::-webkit-scrollbar-thumb {
                background: #888;  
                border-radius: 12px;
              }

              /* Handle on hover */
              ::-webkit-scrollbar-thumb:hover {
                background: #555; 
              }

              max-height: ${customLimit ? customLimit * 42 : 160}px;
            `,
          }}
        >
          {/* Mapped items */}
          <AnimatePresence>
            {updatedItems?.map((el, i) => (
              <motion.div
                key={el.value + i.toString()}
                initial={{ y: -4, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2, delay: (i / 4) * 0.1 }}
              >
                <Item {...el} />
              </motion.div>
            ))}
          </AnimatePresence>
        </Divider>

        {/* Load more items */}
        <AnimatePresence>
          {/* If the limit is less than 4, increase it */}
          {$type == "fetch" && (
            <Button
              key="loadMore"
              as={motion.div}
              initial={{ y: -10, opacity: 0 }}
              exit={{ y: 30, opacity: 0 }}
              variants={buttonVariants}
              animate={limit < length ? "active" : "inactive"}
              transition={{ type: "spring" }}
              $isActive={limit < length}
              onClick={() => {
                if (limit < length) {
                  // Increase limit by two
                  setLimit(limit + 2);
                  // Rotate each time page is synced
                  setRotate(rotate + 180);
                }
              }}
            >
              <Divider
                $options={{
                  additionalStyles: ({ spaces }) => `
                    margin: ${spaces[1]}rem;
                  `,
                }}
              >
                <Animator
                  variants={variants}
                  animate={isLoading ? "rotating" : "stable"}
                >
                  <Icon $icon="sync" $color="white" $size={30} />
                </Animator>
              </Divider>
              Load more
            </Button>
          )}
        </AnimatePresence>
      </Divider>
    </Divider>
  );
};

export { index as Popup };
