// Global styles
import { Icon, Path } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export const AnalyticsOrders = (props: IconType) => {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" {...props}>
      <Path
        d="M6.5,13.5h10v-3H14.1a3.108,3.108,0,0,1-1.083,1.083,2.982,2.982,0,0,1-3.042,0A3.108,3.108,0,0,1,8.9,10.5H6.5Zm5-3A1.5,1.5,0,0,0,13,9h3.5V3.5H6.5V9H10a1.5,1.5,0,0,0,1.5,1.5ZM6.5,15A1.5,1.5,0,0,1,5,13.5V3.5A1.5,1.5,0,0,1,6.5,2h10A1.5,1.5,0,0,1,18,3.5v10A1.5,1.5,0,0,1,16.5,15Zm-3,3A1.5,1.5,0,0,1,2,16.5V5H3.5V16.5H15V18Zm3-4.5h0Z"
        transform="translate(8 8)"
      />
    </Icon>
  );
};
