// Global styles
import { Icon, Path, Circle } from "@styles";

// Global types
import type { Icon as IconType } from "@types";

// Core
import { Fragment } from "react";

interface Custom extends IconType {
  $hasMargin?: boolean;
}

const index = ({ $hasMargin = true, ...props }: Custom) => (
  <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" {...props}>
    {$hasMargin ? (
      <Fragment>
        <Path
          d="M208.694,257.12a1.993,1.993,0,0,1-2,2h-10a2,2,0,0,1-2-2,4.005,4.005,0,0,1,4-4h6A4,4,0,0,1,208.694,257.12Z"
          transform="translate(-186.194 -234.62)"
          opacity="0.15"
        />
        <Circle
          cx="4"
          cy="4"
          r="4"
          transform="translate(11.5 6.5)"
          opacity="0.15"
        />
        <Path
          d="M204.694,253.12a4,4,0,0,1,4,4,1.993,1.993,0,0,1-2,2h-10a2,2,0,0,1-2-2,4.005,4.005,0,0,1,4-4h6m0-1.5h-6a5.506,5.506,0,0,0-5.5,5.5,3.5,3.5,0,0,0,3.5,3.5h10a3.5,3.5,0,0,0,3.5-3.5,5.506,5.506,0,0,0-5.5-5.5Z"
          transform="translate(-186.194 -234.62)"
        />
        <Path
          d="M201.694,241.12a4,4,0,1,1-4,4,4,4,0,0,1,4-4m0-1.5a5.5,5.5,0,1,0,5.5,5.5,5.506,5.506,0,0,0-5.5-5.5Z"
          transform="translate(-186.194 -234.62)"
        />
      </Fragment>
    ) : (
      <Fragment>
        <Path
          d="M214.694,258.834a2.847,2.847,0,0,1-2.857,2.857H197.551a2.856,2.856,0,0,1-2.857-2.857,5.722,5.722,0,0,1,5.714-5.714h8.571A5.713,5.713,0,0,1,214.694,258.834Z"
          transform="translate(-189.194 -233.834)"
          opacity="0.15"
        />
        <Circle
          cx="5.714"
          cy="5.714"
          r="5.714"
          transform="translate(9.786 2.143)"
          opacity="0.15"
        />
        <Path
          d="M209.623,253.763a5.713,5.713,0,0,1,5.714,5.714,2.847,2.847,0,0,1-2.857,2.857H198.194a2.856,2.856,0,0,1-2.857-2.857,5.722,5.722,0,0,1,5.714-5.714h8.571m0-2.143h-8.571a7.866,7.866,0,0,0-7.857,7.857,5.006,5.006,0,0,0,5,5H212.48a5.006,5.006,0,0,0,5-5,7.866,7.866,0,0,0-7.857-7.857Z"
          transform="translate(-189.837 -234.477)"
        />
        <Path
          d="M204.051,241.763a5.714,5.714,0,1,1-5.714,5.714,5.713,5.713,0,0,1,5.714-5.714m0-2.143a7.857,7.857,0,1,0,7.857,7.857,7.865,7.865,0,0,0-7.857-7.857Z"
          transform="translate(-188.551 -239.62)"
        />
      </Fragment>
    )}
  </Icon>
);

export { index as UserIcon };
