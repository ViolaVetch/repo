// Core
import { useState } from "react";

// Core Types
import type { FC } from "react";

// Global styles
import { Errorgroup } from "@styles/Form";
import { Popover } from "@styles";
import { InfoIcon } from "@icons";

const index: FC<{ error: string; type?: string }> = ({ error, type }) => {
  const [popoverVisibility, setPopoverVisibility] = useState<boolean>();

  return (
    <Errorgroup
      hasPassword={type === "password"}
      // onMouseEnter={() => setPopoverVisibility(true)}
      // onMouseLeave={() => setPopoverVisibility(false)}
    >
      <InfoIcon $outline $color="danger" />
    </Errorgroup>
  );
};

export { index as Error };
