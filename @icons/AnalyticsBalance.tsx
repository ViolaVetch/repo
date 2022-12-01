// Global styles
import { Icon, Path } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export const AnalyticsBalance = (props: IconType) => {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" {...props}>
      <Path
        d="M4,14.5V8H5.5v6.5Zm5.25,0V8h1.5v6.5ZM2,17V15.5H18V17Zm12.5-2.5V8H16v6.5ZM2,7V5l8-4,8,4V7ZM4.354,5.5h0Zm0,0H15.646L10,2.688Z"
        transform="translate(8 9)"
      />
    </Icon>
  );
};
