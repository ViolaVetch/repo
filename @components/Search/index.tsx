// Core
import type { FC } from "react";

// Core
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";

// Icons
import { SearchIcon } from "@icons";

// Global components
import { Divider } from "@components";

// Vendors
import styled, { css } from "styled-components";

const Field = styled.input<{ $hasBorder?: boolean; $isActive?: boolean }>`
  border-width: 1px;
  border-style: solid;
  border-color: transparent;

  ${({ theme: { colors, spaces, breakpoints } }) => css`
    padding: ${spaces[2]}rem ${spaces[2]}rem ${spaces[2]}rem 40px;
    border-radius: calc(${spaces[2]}rem + 30px);
    color: ${colors["primary"]};

    &:focus {
      border-color: ${colors["primary"]};
      // box-shadow: 0 0 0 1px ${colors["primary"]};
    }
  `}

  ${({ $hasBorder, theme: { colors } }) =>
    $hasBorder &&
    css`
      border-color: ${colors["border"]};
    `}

  ${({ $isActive, theme: { colors } }) =>
    $isActive &&
    css`
      border-color: ${colors["primary"]};
    `}
`;

export const Search: FC<{
  $placeholder: string;
  $hasBorder?: boolean;
  $onUpdate: (value?: string) => void;
}> = ({ $placeholder, $hasBorder, $onUpdate }) => {
  // Handle value
  const [value, setValue] = useState<string>();
  const [hasFocus, setHasFocus] = useState<boolean>(false);

  useEffect(() => {
    $onUpdate(value);
  }, [, value]);

  return (
    <Divider
      $options={{
        additionalStyles: ({ spaces }) => `
          input {
            width: 100%;
          }
          
          svg {
            position: absolute;
            top: calc(50% - 15px);
            left: ${spaces[1]}rem;
          }
        `,
      }}
    >
      <SearchIcon
        $outline
        $size={30}
        $color={hasFocus ? "primary" : Boolean(value) ? "primary" : "grey"}
      />

      <Field
        $hasBorder={$hasBorder}
        $isActive={Boolean(value)}
        placeholder={$placeholder}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        onChange={(e) => setValue(e.target.value)}
      />
    </Divider>
  );
};
