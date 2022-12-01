// Core types
import type { FC } from "react";

// Vendors
import { useFormikContext } from "formik";

// Global components
import { Divider, Separator } from "@components";

// Global icons
import { WarningIcon } from "@icons";

// Local components
import { Code } from "./Code";

// Local container types
import { IOrderFields } from "..";

interface Discount {}

const index: FC<Discount> = () => {
  const { values } = useFormikContext<IOrderFields>();

  return (
    <Divider
      $direction="column"
      $color="secondary"
      $margin={{ top: 2 }}
      $options={{
        additionalStyles: ({ colors, defaults }) => `
            border-radius: ${defaults["radius"]}px;
            background-color: ${colors["pending"]};
            `,
      }}
    >
      <Divider $alignItems="center" $color="white" $padding={2}>
        <Divider $alignItems="center">
          <WarningIcon $color="white" /> <Divider>Discount applied</Divider>
        </Divider>

        <Separator
          $axis="y"
          $height={20}
          $margin={2}
          $style={() => `
                background: rgba(255,255,255,.30);
                border-color: rgba(255,255,255,.30);
                border-right-width: 1.5px;
            `}
        />

        {/* Text */}
        <Divider $alignItems="center">
          <Divider
            $options={{
              additionalStyles: () => `
                    color: rgba(255,255,255,0.75);
                `,
            }}
          >
            Received {values.coupon?.sale}% discount with coupon code:
          </Divider>

          <Code {...{ code: values.coupon?.code }} />
        </Divider>
      </Divider>
    </Divider>
  );
};

export { index as Discount };
