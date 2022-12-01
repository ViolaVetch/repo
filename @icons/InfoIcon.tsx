// Core
import { Fragment } from "react";

// Global styles
import { Icon, Path } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

export default function InfoIcon(props: IconType) {
  return (
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" {...props}>
      {props.$outline ? (
        <Fragment>
          <Path d="M9.5,1.5a8,8,0,1,0,8,8,8.009,8.009,0,0,0-8-8M9.5,0A9.5,9.5,0,1,1,0,9.5,9.5,9.5,0,0,1,9.5,0Z" />
          <Path
            d="M960.7,541.151a.75.75,0,0,1-.75-.75v-4.423a.75.75,0,0,1,1.5,0V540.4A.75.75,0,0,1,960.7,541.151Z"
            transform="translate(-951.202 -530.978)"
          />
          <Path
            d="M960.7,544.909a.75.75,0,0,1-.75-.75v-.76a.75.75,0,0,1,1.5,0v.76A.75.75,0,0,1,960.7,544.909Z"
            transform="translate(-951.202 -531.148)"
          />
        </Fragment>
      ) : (
        <Path
          d="M281.33,245.18a9.242,9.242,0,1,0,2.71,6.53A9.2,9.2,0,0,0,281.33,245.18Zm-5.79,10.49a.75.75,0,1,1-1.5,0v-.64a.75.75,0,1,1,1.5,0Zm0-3.42a.75.75,0,0,1-1.5,0v-4.49a.75.75,0,0,1,1.5,0Z"
          transform="translate(-265.54 -242.46)"
        />
      )}
    </Icon>
  );
}
