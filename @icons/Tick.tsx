// Global styles
import { Icon, Path } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export const Tick = (props: IconType) => {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
      <Path
        d="M452.736,508.661l-8.523,8.523a1.206,1.206,0,0,1-1.708,0l-5.124-5.124a1.217,1.217,0,0,1,.064-1.708,1.2,1.2,0,0,1,1.643,0l4.27,4.27,7.669-7.669a1.208,1.208,0,0,1,1.708,1.708Z"
        transform="translate(-435.062 -502.083)"
      />
    </Icon>
  );
};
