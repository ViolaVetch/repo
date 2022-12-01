// Global styles
import { Icon, Path, Rect } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export default function SearchIcon(props: IconType) {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" {...props}>
      {!props.$outline && (
        <Path
          d="M19,11a8,8,0,1,1-8-8A8,8,0,0,1,19,11Z"
          transform="translate(3.75 3.75)"
          opacity="0.15"
        />
      )}
      <Path
        d="M3.75,11A7.25,7.25,0,1,1,11,18.25,7.25,7.25,0,0,1,3.75,11ZM11,2.25a8.75,8.75,0,1,0,5.634,15.445L19.47,20.53A.75.75,0,0,0,20.53,19.47l-2.835-2.836A8.75,8.75,0,0,0,11,2.25Z"
        transform="translate(3.75 3.75)"
        fillRule="evenodd"
      />
    </Icon>
  );
}
