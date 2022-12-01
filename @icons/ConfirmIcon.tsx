// Global styles
import { Icon, Path } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export default function ConfirmIcon(props: IconType) {
  return (
    <Icon
      viewBox="0 0 11.5 8.167"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.333,8.417A.746.746,0,0,1,3.8,8.2L.47,4.864A.75.75,0,1,1,1.53,3.8l2.8,2.8L10.47.47A.75.75,0,1,1,11.53,1.53L4.864,8.2A.75.75,0,0,1,4.333,8.417Z"
        transform="translate(-0.25 -0.25)"
      />
    </Icon>
  );
}
