// Core types
import type { FC } from "react";

// Core
import { useState, useEffect } from "react";

// Global icons
import { ActivityIcon, CoinbaseIcon } from "@icons";

// Global components
import { Divider, Heading } from "@components";

export const Order: FC<{ purchase: any }> = (props) => {
  const handlePayment = () => {
    const link = "https://commerce.coinbase.com/checkout";
    const checkoutId = props.purchase.cc.id;
    const redirectUrl = `${link}/${checkoutId}`;
    window.open(redirectUrl, "_blank");
  };

  // Check current responsivity layout
  const [layout, setLayout] = useState<"xs" | "sm">();

  const detectLayout = () => {
    const xs = window.matchMedia("(max-width: 768px)").matches;
    const sm = window.matchMedia("(min-width: 768px)").matches;

    if (xs) setLayout("xs");
    if (sm) setLayout("sm");
  };

  useEffect(() => {
    // Detect initial layout
    detectLayout();

    // Listen to window resize and resize layouts
    window.addEventListener("resize", detectLayout);
  }, []);

  return (
    <Divider
      $options={{
        additionalStyles: ({ colors, defaults }) => `
          width: 100%;
          min-height: 450px;
          background-color: ${colors["white"]};
          box-shadow: 0 0 40px rgba(0,0,0,.025);
          border-radius: ${defaults["radius"] * 2}px;
          transition: all 200ms ease-in-out;
          padding: 4rem;
          &:hover {
            box-shadow: 0 0 60px rgba(0,0,0,.075);
          }
        `,
      }}
    >
      <Divider
        $direction="column"
        $alignItems="center"
        $textAlign="center"
        $justifyContent="center"
        $options={{
          additionalStyles: ({ breakpoints }) => `
              width: 100%;
              margin-left: auto;
              margin-right: auto;
            `,
        }}
      >
        <Divider
          $alignItems="center"
          $justifyContent="center"
          $margin={{ bottom: 1 }}
          $options={{
            additionalStyles: () => {
              const color = {
                created: "#888",
                pending: "#edbf6f",
                confirmed: "#21b573",
                unfulfilled: "#21b573",
                failed: "#f56464",
              }[props.purchase?.status as string];

              return `
                  width: 50px;
                  height: 50px;
                  background: ${(props: any): any => props.color + "10"};
                  border-radius: 99px;
                  border-width: 1px;
                  border-style: solid;
                  border-color: ${color};

                  svg {
                    fill: ${color};
                  }
                `;
            },
          }}
        >
          <ActivityIcon $size={20} />
        </Divider>

        <Heading $as="h3">
          {
            {
              created: "Payment created",
              pending: "Payment pending",
              confirmed: "Payment completed",
              failed: "Payment failed",
              unfulfilled: "Paid but unfulfilled",
            }[props.purchase?.status as string]
          }
        </Heading>

        <Heading
          $as="p"
          $options={{
            additionalStyles: ({ spaces }) => `
                margin-top: ${(spaces[1] as number) * 1}rem;
                margin-bottom: ${(spaces[1] as number) * 1.5}rem;
                line-height: 1.5;
                opacity: 0.485;
              `,
          }}
        >
          {
            {
              created:
                "The order page was created but payment has not been received, continue to Coinbase to purchase the products.",
              pending:
                "We received the payment but is being veriefied by the network, please refresh this page within 10 minutes.",
              confirmed: `We have received the payment and you now can use the products ${
                layout === "xs" ? "below" : "on the right"
              }.`,
              failed:
                "The payment has failed, and this order is canceled also scheduled for deletion within 24 hours.",
              unfulfilled:
                "We have received the payment, but unfortunately, some of the products have been already sold. Please contact customer support.",
            }[props.purchase?.status as string]
          }
        </Heading>

        {props.purchase?.status === "created" && (
          <Divider
            $alignItems="center"
            $extends="button"
            $padding={2}
            $color="white"
            $options={{
              additionalStyles: ({ defaults, colors }) => `
                  border-radius: 30px;
                  background-color: ${colors["primary"]};
                  &:hover {
                    background-color: ${colors["primary"]}CC;
                  }

                `,
            }}
            onClick={() => handlePayment()}
          >
            <Divider $margin={{ right: 1 }}>
              <CoinbaseIcon $color="white" $size={20} />
            </Divider>
            Pay with Coinbase
          </Divider>
        )}
      </Divider>
    </Divider>
  );
};
