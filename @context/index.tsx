// Core types
import type { FC } from "react";

// Core
import { useState, useMemo, createContext } from "react";

// Vendors
import { ThemeProvider } from "styled-components";

// App context properties
import { Theme } from "@context/theme";

// Global types
import { IPage, IWebsiteSettings } from "@types";

export interface IInstance extends IWebsiteSettings {
  pages: IPage[];
}

type Appearances = "light" | "dark";
export interface AppContext {
  appearance: Appearances;
  setAppearance: Function;
  instance: IInstance;
  setInstance: (instance: IInstance) => void;
}

// Create Context base
export const StoreContext = createContext({} as AppContext);

// Instruct component Props Types
interface Props {
  instance: IInstance; // Known as "website"
  children: React.ReactNode;
}

export const Store: FC<Props> = ({ instance: i, children }) => {
  const [instance, setInstance] = useState<IInstance>(i);
  const memoizedInstance = useMemo(() => instance, [instance]);

  // Manage appearance
  const [appearance, setAppearance] = useState<Appearances>("light");
  const memoizedAppearance = useMemo(() => appearance, [appearance]);

  return (
    <StoreContext.Provider
      value={
        {
          instance: memoizedInstance, // to be updated
          appearance: memoizedAppearance,
          setAppearance,
          setInstance,
        } as AppContext
      }
    >
      <ThemeProvider
        theme={{
          ...Theme.light,
          colors: {
            ...Theme.light.colors,
            primary: instance.primaryColor,
            secondary: instance.secondaryColor
              ? instance.secondaryColor
              : "#222a30",
          },
        }}
      >
        {children}
      </ThemeProvider>
    </StoreContext.Provider>
  );
};
