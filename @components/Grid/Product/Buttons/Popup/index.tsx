// Core
import { useContext, useEffect, useRef } from "react";
import Link from "next/link";

// Core types
import type { FC } from "react";

// Local context
import { GridProductContext } from "../..";

// Global components
import { Divider } from "@components";

// Global styles
import { Triangle } from "@styles";

// Local components
import { Variant } from "./Variant";

export const Popup: FC<{ $close: Function }> = ({ $close }) => {
  // Popup Node Ref
  const ref = useRef<HTMLDivElement>(null);

  // Local context
  const { product } = useContext(GridProductContext);

  // Handle outside click
  const handleClickOutside = (event: { target: any }) => {
    if (ref.current && !ref.current?.contains(event.target)) {
      $close();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <Divider
      ref={ref}
      $direction="column"
      $options={{
        additionalStyles: ({ spaces, colors, breakpoints }) => `
          border-radius: 30px;
          background-color: ${colors["white"]};
          padding:  ${(spaces[1] as number) * 1.25}rem ${spaces[1]}rem;
          position: absolute;
          cursor: initial;
          box-shadow: 0 -9px 40px rgba(0,0,0,.15);
          top: calc(100% + 5px);
          left: -50%;
          width: 200%;
            
          @media (max-width: ${breakpoints["sm"]}px) {
            right: 0;
            left: initial;            
            ${Triangle} {
              right: 20px
            }
          }          
	      `,
      }}
    >
      <Triangle $size={2} />

      {product.variants.slice(0, 2).map((el) => (
        <Variant key={el._id.toString()} {...el} />
      ))}

      {product.variants.length > 2 && (
        <Divider
          $options={{
            additionalStyles: ({ spaces, colors, defaults }) => `
		    padding: ${spaces[1]}rem;
		    font-size: 14px;
		    display: block;
		    text-align: center;
		    width: 100%;
		    a {
		      color: ${colors["primary"]}
		    }
		  `,
          }}
        >
          2 more variants available,{" "}
          <Link href={`/product/${product.path}`}>
            <a> view product page.</a>
          </Link>
        </Divider>
      )}
    </Divider>
  );
};
