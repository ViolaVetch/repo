// Global styles
import { Icon, Path } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export default function CancelIcon(props: IconType) {
  return (
    <Icon
      viewBox="0 0 9.5 9.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8.22,9.28,4.75,5.811,1.281,9.28A.75.75,0,0,1,.22,8.22l3.47-3.47L.22,1.281A.75.75,0,0,1,1.281.22L4.75,3.689,8.22.22A.75.75,0,0,1,9.28,1.281L5.811,4.75,9.28,8.22A.75.75,0,1,1,8.22,9.28Z"
        transform="translate(0 0)"
      />
    </Icon>
  );
}
