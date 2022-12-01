// Global styles
import { Icon, Path } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export const More = (props: IconType) => {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
      <Path
        d="M1.5,0A1.5,1.5,0,1,1,0,1.5,1.5,1.5,0,0,1,1.5,0Z"
        transform="translate(3 9)"
      />
      <Path
        d="M1.5,0A1.5,1.5,0,1,1,0,1.5,1.5,1.5,0,0,1,1.5,0Z"
        transform="translate(9 9)"
      />
      <Path
        d="M1.5,0A1.5,1.5,0,1,1,0,1.5,1.5,1.5,0,0,1,1.5,0Z"
        transform="translate(15 9)"
      />
    </Icon>
  );
};
