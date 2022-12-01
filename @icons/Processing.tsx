// Global styles
import { Icon, Path } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export const Processing = (props: IconType) => {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width="18.5"
      height="18.5"
      viewBox="0 0 18.5 18.5"
      {...props}
    >
      <Path
        d="M302.354,268.222a7.25,7.25,0,1,1-7.25,7.25,7.194,7.194,0,0,1,7.25-7.25m0-2a9.27,9.27,0,1,0,6.53,2.71,9.248,9.248,0,0,0-6.53-2.71Z"
        transform="translate(-293.104 -266.222)"
      />
      <Path
        d="M305.844,271.977a4.94,4.94,0,1,0,1.453,3.495A4.923,4.923,0,0,0,305.844,271.977Z"
        transform="translate(-293.104 -266.222)"
      />
    </Icon>
  );
};
