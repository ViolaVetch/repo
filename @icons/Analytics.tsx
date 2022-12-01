// Global styles
import { Icon, Path } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export const Analytics = (props: IconType) => {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" {...props}>
      <Path
        d="M5,16V11H7v5Zm4,0V8h2v8Zm4,0V4h2V16Z"
        transform="translate(8 8)"
      />
    </Icon>
  );
};
