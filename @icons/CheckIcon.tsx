// Global styles
import { Icon, Path } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export const CheckIcon = (props: IconType) => {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width="18.5"
      height="18.5"
      viewBox="0 0 18.5 18.5"
      {...props}
    >
      <Path
        d="M300.157,263.675a9.242,9.242,0,1,0,2.72,6.54A9.214,9.214,0,0,0,300.157,263.675Zm-1.77,4.42-5.29,5.29a.767.767,0,0,1-.53.22.786.786,0,0,1-.53-.22l-3.18-3.18a.75.75,0,0,1,1.06-1.06l2.65,2.65,4.76-4.76a.75.75,0,0,1,1.06,1.06Z"
        transform="translate(-284.377 -260.965)"
      />
    </Icon>
  );
};
