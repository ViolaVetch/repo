// Global styles
import { Icon, Path } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export default function WarningIcon(props: IconType) {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width="18.5"
      height="18.5"
      viewBox="0 0 18.5 18.5"
      {...props}
    >
      <Path
        d="M308.32,257.77l-6.75-13.49a1.541,1.541,0,0,0-2.76,0l-6.75,13.49a1.547,1.547,0,0,0,1.38,2.24h13.5A1.547,1.547,0,0,0,308.32,257.77Zm-7.38-1.13a.75.75,0,0,1-1.5,0V256a.75.75,0,0,1,1.5,0Zm0-3.42a.75.75,0,0,1-1.5,0v-4.49a.75.75,0,0,1,1.5,0Z"
        transform="translate(-291.896 -243.425)"
      />
    </Icon>
  );
}
