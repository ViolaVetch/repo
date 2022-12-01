// Core types
import type { FC } from "react";

// Vendors
import { useSelector, useDispatch } from "react-redux";

import {
  InfoIcon,
  SuccessIcon,
  CancelIcon,
  WarningIcon,
  ErrorIcon,
  ConfirmIcon,
} from "@icons";

// Global components
import { Separator, Divider } from "@components";

import { Button } from "@components";

// Global types
import { Store } from "@types";

// Local state manager
import { hideConfirmation } from "redux/confirmationSlice";

export const Confirmation: FC = () => {
  const dispatch = useDispatch();
  const confirmation = useSelector((state: Store) => state.confirmation);

  if (confirmation.isShowing === true)
    return (
      <Divider
        $alignItems="center"
        $justifyContent="center"
        $options={{
          additionalStyles: () => `
            width: 100vw;
            height: 100vh;
            position: fixed;
            overflow: hidden;
            background: #22222245;
            z-index: 900 !important;
        `,
        }}
      >
        <Divider
          $direction="column"
          $options={{
            additionalStyles: () => `
            width: 420px;
            height: auto;
            padding: .75em;
            background: #fff;
            border: 1px solid #eaeef2;
            border-radius: 1em;
            overflow: hidden;
          `,
          }}
        >
          <Divider $alignItems="center">
            {
              {
                success: <SuccessIcon $size={35} />,
                error: <ErrorIcon $size={35} />,
                warning: <WarningIcon $size={35} />,
                info: <InfoIcon $size={35} />,
              }[confirmation.type]
            }

            <Divider
              $options={{
                additionalStyles: ({ font, spaces }) =>
                  `margin-left: ${(spaces[1] as number) / 2}rem;
                  font-weight: ${font.weight.semiBold}`,
              }}
            >
              {confirmation.title}
            </Divider>
          </Divider>

          <Separator $axis="x" $margin={1} />

          <Divider $direction="column">{confirmation.message}</Divider>

          <Divider $margin={{ top: 2, right: "auto" }}>
            <Button
              $variant="primary"
              $style="outline"
              type="button"
              onClick={() => dispatch(hideConfirmation())}
            >
              <CancelIcon $size={12} $color="secondary" />
              <Divider $margin={{ left: 1 }} $color="primary">
                Cancel
              </Divider>
            </Button>

            <Divider $margin={{ left: 2 }}>
              <Button
                $variant="primary"
                type="button"
                onClick={() => {
                  confirmation.action();
                  dispatch(hideConfirmation());
                }}
              >
                <ConfirmIcon $color="white" $size={12} />
                <Divider $margin={{ left: 1 }} $color="white">
                  Confirm
                </Divider>
              </Button>
            </Divider>
          </Divider>
        </Divider>
      </Divider>
    );

  return <></>;
};
