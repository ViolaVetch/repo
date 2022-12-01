// Global styles
import { Icon, Path } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export const AnalyticsInventory = (props: IconType) => {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" {...props}>
      <Path
        id="inventory_2_FILL0_wght400_GRAD0_opsz20"
        d="M3,16.5V7.917a1.314,1.314,0,0,1-.74-.542A1.561,1.561,0,0,1,2,6.5v-3A1.5,1.5,0,0,1,3.5,2h13A1.5,1.5,0,0,1,18,3.5v3a1.561,1.561,0,0,1-.26.875,1.314,1.314,0,0,1-.74.542V16.5A1.5,1.5,0,0,1,15.5,18H4.5A1.5,1.5,0,0,1,3,16.5ZM4.5,8v8.5h11V8Zm12-1.5v-3H3.5v3ZM8,11.5h4V10H8Zm-3.5,5v0Z"
        transform="translate(8 8)"
      />
    </Icon>
  );
};
