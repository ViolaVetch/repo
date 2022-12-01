// Global styles
import { Icon, Path } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export const ArrowUp = (props: IconType) => {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" {...props}>
      <Path
        d="M8.473-.707l-9.18,9.18,2.121,2.121L8.472,3.536,15.537,10.6,17.658,8.48Z"
        transform="translate(1.025 4.553)"
      />
    </Icon>
  );
};
