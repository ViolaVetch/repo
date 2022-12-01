// Global styles
import { Icon, Path } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export const ArrowDown = (props: IconType) => {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" {...props}>
      <Path
        d="M8.473,10.6l-9.18-9.18L1.414-.7,8.472,6.358,15.537-.707l2.121,2.121Z"
        transform="translate(1.025 4.553)"
      />
    </Icon>
  );
};
