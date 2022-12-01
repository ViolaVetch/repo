// Global styles
import { Icon, Path } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export const Plus = (props: IconType) => {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
      <g transform="translate(-2 -2)">
        <Path
          d="M12,2A10,10,0,1,1,2,12,10.011,10.011,0,0,1,12,2"
          fill="none"
          opacity="0.14"
        />
        <Path
          d="M15.29,14.052l-1.779-1.778L15.289,10.5a.875.875,0,0,0-1.237-1.238l-1.779,1.778-1.779-1.78a.875.875,0,0,0-1.238,1.238l1.78,1.78L9.26,14.049A.875.875,0,0,0,10.5,15.287l1.776-1.776,1.78,1.779a.875.875,0,0,0,1.237-1.238"
          fill="none"
        />
      </g>
      <Path
        d="M12,2A10,10,0,1,1,2,12,10.011,10.011,0,0,1,12,2"
        transform="translate(-2 -2)"
        opacity="0.14"
      />
      <Path
        d="M15.29,14.052l-1.779-1.778L15.289,10.5a.875.875,0,0,0-1.237-1.238l-1.779,1.778-1.779-1.78a.875.875,0,0,0-1.238,1.238l1.78,1.78L9.26,14.049A.875.875,0,0,0,10.5,15.287l1.776-1.776,1.78,1.779a.875.875,0,0,0,1.237-1.238"
        transform="translate(10 -7.357) rotate(45)"
      />
    </Icon>
  );
};
