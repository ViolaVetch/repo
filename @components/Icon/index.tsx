// Core types
import type { FC } from "react";

// Core
import { createElement } from "react";

// Global types
import { IIcon, TIconsList } from "@types";

// Global icons
import {
  ArrowIcon,
  Sync,
  Save,
  Plus,
  RoundedRemoveIcon,
  Analytics,
  AnalyticsBalance,
  AnalyticsCompleted,
  AnalyticsInventory,
  AnalyticsOrders,
  AnalyticsRevenue,
  AnalyticsUser,
} from "@icons";

type IconsType = {
  [key in TIconsList]: React.FC<IIcon>;
};

const Icons: IconsType = {
  sync: Sync,
  "arrow-left": ArrowIcon,
  save: Save,
  plus: Plus,
  times: RoundedRemoveIcon,
  "analytics-balance": AnalyticsBalance,
  "analytics-completed": AnalyticsCompleted,
  "analytics-inventory": AnalyticsInventory,
  "analytics-orders": AnalyticsOrders,
  "analytics-revenue": AnalyticsRevenue,
  "analytics-user": AnalyticsUser,
  "analytics": Analytics,
};

const index: FC<IIcon> = ({ $icon, ...props }) =>
  createElement(Icons[$icon], {
    key: $icon as TIconsList,
    $icon,
    ...props,
  });

export { index as Icon };
