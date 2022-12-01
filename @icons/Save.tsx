// Global styles
import { Icon, Path } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export const Save = (props: IconType) => {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
      <path d="M0,0H20V20H0Z" fill="none" />
      <path
        d="M12,2A10,10,0,1,1,2,12,10,10,0,0,1,12,2"
        transform="translate(-2 -2)"
        fill="none"
        opacity="0.14"
      />
      <path
        d="M20,9.053v9.781A1.2,1.2,0,0,1,18.833,20H7.167A1.2,1.2,0,0,1,6,18.833V7.167A1.2,1.2,0,0,1,7.167,6h9.781Zm-1.167.525L16.422,7.167H7.167V18.833H18.833ZM13,17.569a2.025,2.025,0,1,0-1.429-.593A1.948,1.948,0,0,0,13,17.569ZM8.2,10.978h6.961V8.2H8.2Zm-1.031-1.4v0Z"
        transform="translate(-3 -3)"
      />
    </Icon>
  );
};
