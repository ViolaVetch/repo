// Core
import { useRef, useEffect } from "react";

// Vendors
import styled from "styled-components";

// Global components
import { Divider } from "@components";

// Global styles
import { Triangle } from "@styles";

export const Options = ({ items, ...props }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event: { target: any }) => {
    if (ref.current && !ref.current?.contains(event.target)) {
      props.close();
    }
  };

  return (
    <Divider
      ref={ref}
      $options={{
        additionalStyles: ({ defaults, colors, spaces }) => `
          background: ${colors["white"]};
          border-radius: ${defaults["radius"] * 2.5}px;
          padding: ${spaces[1]}rem;
          width: 150%;
          min-width: 190px;
          box-shadow: 0 0 30px rgba(0,0,0,.125);
          border: 0;
          position: absolute;
          right: -20px;
          top: calc(100% + 5px);
          z-index: 999;
          ${Triangle} {
            z-index: -1;
            right: 25px;
          }
        `,
      }}
    >
      <Triangle $size={2} />

      <Divider
        $direction="column"
        $options={{
          additionalStyles: ({ defaults, colors, spaces }) => `
            width: 100%;
          `,
        }}
      >
        {items.map((item: any, index: any): any => (
          <Divider
            key={index}
            $alignItems="center"
            $options={{
              additionalStyles: ({ colors, spaces }) => `
                  padding: ${(spaces[1] as number) * 2}rem ${spaces[2]}rem;
                  color: ${colors[item.selected ? "primary" : "grey"]};

                  border: 0;
                  cursor: pointer;
                  width: 100%;                

                  &:not(:last-of-type) {
                    border-bottom: 1px solid ${colors["primary"]}10;
                  }

                  svg {
                    margin-right: ${(spaces[1] as number) / 2}rem;
                    fill:  ${colors[item.selected ? "primary" : "grey"]};
                  }
                  
                  &:hover {
                    color: ${colors["primary"]};
                    svg {
                      fill:  ${colors["primary"]};
                    }
                  }

                `,
            }}
            onClick={item.action}
          >
            {item.icon}
            {item.name}
          </Divider>
        ))}
      </Divider>
    </Divider>
  );
};
