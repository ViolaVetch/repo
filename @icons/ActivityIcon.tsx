// Global styles
import { Icon, Path, Rect } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export const Activity = (props: IconType) => {
  return (
    <Icon
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 4.25C15.3 4.25 15.5712 4.4288 15.6894 4.70456L18.4945 11.25L22 11.25C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75L18 12.75C17.7 12.75 17.4288 12.5712 17.3106 12.2954L15 6.90395L9.68936 19.2954C9.57117 19.5712 9.30002 19.75 9 19.75C8.69998 19.75 8.42882 19.5712 8.31064 19.2954L5.50545 12.75L2 12.75C1.58579 12.75 1.25 12.4142 1.25 12C1.25 11.5858 1.58579 11.25 2 11.25L6 11.25C6.30002 11.25 6.57117 11.4288 6.68936 11.7046L9 17.0961L14.3106 4.70456C14.4288 4.4288 14.7 4.25 15 4.25Z"
      />
    </Icon>
  );
};
