// Core types
import { FC } from "react";

// Global components
import { Divider } from "@components";

// Global types
import { Store } from "@types";

// Vendors
import { useSelector } from "react-redux";

// Icons
import { SuccessIcon, ErrorIcon } from "@icons";

export const Notification: FC = () => {
  let message;

  const notification = useSelector((state: Store) => state.notification);

  const lineStyle = {
    height: "1em",
    background: "#eaeef2",
    width: "1px",
    borderRadius: "9px",
    margin: "0em .75em",
  };

  if (typeof notification.message === "string") message = notification.message;
  else message = "Something went wrong";

  if (notification.isShowing === true)
    return (
      <Divider
        $background={{ color: "white" }}
        $alignItems="center"
        $options={{
          additionalStyles: ({ spaces, colors, defaults }) => `
            width: fit-content;
            block-size: fit-content;
            position: fixed;
            bottom: 0em;
            height: auto;
            right: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            white-space: nowrap;
            white-space: nowrap;
            z-index: 9999;
            padding: ${spaces[2]}rem;
            border: 1px solid ${colors.border};
            border-radius: ${defaults.radius}px;
          `,
        }}
      >
        {
          {
            true: <SuccessIcon $size={24} />,
            false: <ErrorIcon $color="danger" $size={24} />,
          }[notification.success]
        }

        <div style={lineStyle} />

        <p>{message}</p>
      </Divider>
    );

  return <></>;
};
