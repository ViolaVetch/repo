// Core types
import { FC, useContext } from "react";

// Vendors
import styled, { css } from "styled-components";

// Global components
import { Divider } from "@components";

// Global icons
import { SearchIcon } from "@icons";

// Local context
import { DropdownContext } from "@components/Dropdown";

const Input = styled.input`
  width: 100%;
  ${({ theme: { spaces } }) => css`
    padding: ${spaces[2]}rem ${spaces[2]}rem ${spaces[2]}rem
      calc(30px + ${(spaces[1] as number) * 1.5}rem);
  `}
`;

interface Search {}

const index: FC<Search> = () => {
  const { $search, originalItems, updatedItems, setUpdatedItems } =
    useContext(DropdownContext);

  const filterItems = (value: string) => {
    const filteredItems = originalItems.filter((el) => {
      String.prototype.includes = function (str) {
        return this.indexOf(str) !== -1;
      };

      return (
        el.value.toLowerCase().includes(value.toLowerCase()) ||
        el.label.toLowerCase().includes(value.toLowerCase())
      );
    });

    if (!Boolean(value)) setUpdatedItems(originalItems);
    else setUpdatedItems(filteredItems);
  };

  return (
    <Divider
      $alignItems="center"
      $options={{
        additionalStyles: ({ colors, spaces }) => `
            border: 1px solid ${colors["border"]};
            width: 100%;
            border-radius: 30px;
            overflow: hidden;
        `,
      }}
    >
      <Divider
        $options={{
          additionalStyles: ({ spaces }) => `
            position: absolute;
            width: 70px;
            z-index: 10;
            pointer-events: none;
            left: ${(spaces[1] as number) * 1.5}rem;
          `,
        }}
      >
        <SearchIcon $outline $color="grey" $size={30} />
      </Divider>

      <Divider $margin={{ left: 1 }}>
        <Input
          onChange={(e) => filterItems(e.target.value)}
          maxLength={20}
          placeholder={$search?.placeholder ? $search?.placeholder : "Search"}
        />
      </Divider>
    </Divider>
  );
};

export { index as Search };
