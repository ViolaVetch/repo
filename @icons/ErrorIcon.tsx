// Global styles
import { Icon, Path } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export default function ErrorIcon(props: IconType): any {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
      <Path
        d="M279.08,248.96a9.25,9.25,0,1,0,9.25,9.25A9.248,9.248,0,0,0,279.08,248.96Zm2.35,10.9-.7.7-1.65-1.65-1.65,1.65-.7-.7,1.65-1.65-1.65-1.65.7-.7,1.65,1.65,1.65-1.65.7.7-1.65,1.65Z"
        transform="translate(-269.08 -248.21)"
        opacity="0.15"
      />
      <Path
        d="M279.78,258.21l1.65,1.65-.7.7-1.65-1.65-1.65,1.65-.7-.7,1.65-1.65-1.65-1.65.7-.7,1.65,1.65,1.65-1.65.7.7Z"
        transform="translate(-269.08 -248.21)"
      />
    </Icon>
  );
}
