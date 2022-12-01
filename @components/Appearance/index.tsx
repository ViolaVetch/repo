// Core types
import { FC, useContext } from "react";

// Vendors
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// Global types
import { Store } from "@types";

// Global styles
import { Select } from "@styles";

// Global context
import { StoreContext } from "@context";

const Appearance = styled(Select)`
  ${({ theme: { defaults, colors, font, ...theme } }) => css``}
`;

interface Appearance {
  children?: React.ReactNode;
}

const index: FC<Appearance> = ({ children, ...props }) => {
  const { appearance, setAppearance } = useContext(StoreContext);

  return (
    <Appearance
      {...props}
      value={appearance}
      onChange={() => {
        if (appearance === "light") setAppearance("dark");
        else setAppearance("light");
      }}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </Appearance>
  );
};

export { index as Appearance };
