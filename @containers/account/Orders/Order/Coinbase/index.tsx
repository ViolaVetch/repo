// Core types
import { FC, useEffect, useMemo, useState } from "react";

// Vendors
import styled, { css } from "styled-components";

// Vendors
import { useFormikContext } from "formik";

// Global components
import { Divider, Heading } from "@components";

// Get local
import { IOrderFields } from "..";

// Global icons
import { CopyIcon } from "@icons";

const Label = styled(Divider)`
  ${({ theme: { spaces, font } }) => css`
    margin-bottom: ${spaces[1]}rem;
    font-weight: ${font["weight"]["semiBold"]};
  `}
`;

const Body = styled(Divider)`
  ${({ theme: { spaces, font } }) => css`
    font-size: 18px;
    font-weight: ${font["weight"]["semiBold"]};
  `}
`;

interface Amounts {}

const Payment: FC<{ $currency: string; $amount: string }> = ({
  $amount,
  $currency,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Disable alert
    if (copied === true) setTimeout(() => setCopied(false), 1000);
  }, [copied]);

  return (
    <Divider
      onClick={async () => {
        // Define text
        const text = `${$amount} ${$currency}`;

        // Check if we're on a browser
        if (navigator) {
          await navigator.clipboard.writeText(text).then(() => {
            // If it's copied successfully
            setCopied(true);
          });
        }
      }}
      $options={{
        additionalStyles: ({ spaces, defaults }) => `
          padding: ${spaces[1]}rem;
          border-radius: ${defaults["radius"]}px;
          background-color: rgba(255,255,255,.075);
          cursor: pointer;
          &:active {
            transform: scale(0.94);
          }
        `,
      }}
    >
      {$amount} {$currency}
      {copied && (
        <Divider
          $options={{
            additionalStyles: ({ defaults, spaces, colors }) => `
              border-radius: 30px;
              position: absolute;
              box-shadow: 0 0 19px rgba(0,0,0,.075);
              right: calc(50% - 70px);
              bottom: 100%;
              width: 140px;
              font-size: 13px;
              padding: ${spaces[1] as number}rem;
              background-color: ${colors["white"]};
              color: ${colors["primary"]};
              justify-content: center;
            `,
          }}
        >
          Amount copied
        </Divider>
      )}
    </Divider>
  );
};

const index: FC<Amounts> = () => {
  // Grab local order values
  const { values } = useFormikContext<IOrderFields>();

  // Return a fragment if event doesnt exist
  if (!values["event"]) {
    return <></>;
  }

  // Destructure event object
  const event = values["event"]["data"];

  return (
    <Divider
      $direction="column"
      $options={{
        additionalStyles: ({ defaults, spaces }) => `
        background-color: #0052FF;
        color: #fff;
        padding: ${(spaces[1] as number) * 2}rem;
        border-radius: ${defaults["radius"]}px;
      `,
      }}
    >
      {/* Header */}
      <Divider
        $padding={{
          bottom: 2,
        }}
        $direction="column"
      >
        <Divider
          $options={{
            additionalStyles: ({ font, spaces }) => `
              font-weight: ${font["weight"]["semiBold"]};
              svg {
                fill: #fff;
                margin-right: ${spaces[2]}rem;
              }
            `,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="Coinbase logo"
            viewBox="0 0 48 48"
            width="24"
          >
            <path d="M24,36c-6.63,0-12-5.37-12-12s5.37-12,12-12c5.94,0,10.87,4.33,11.82,10h12.09C46.89,9.68,36.58,0,24,0 C10.75,0,0,10.75,0,24s10.75,24,24,24c12.58,0,22.89-9.68,23.91-22H35.82C34.87,31.67,29.94,36,24,36z"></path>
          </svg>
          <Heading $as="h5">COINBASE Payment</Heading>
        </Divider>
      </Divider>

      {/* Body */}
      <Divider
        $padding={{
          top: 2,
        }}
        $options={{
          additionalStyles: () => `
            border-top: 1px solid rgba(255,255,255,.075);
          `,
        }}
      >
        <Divider $direction="column" $margin={{ right: 4 }}>
          <Label>Local currency</Label>
          <Body>
            <Divider
              $options={{
                additionalStyles: ({ spaces, defaults }) => `
                    padding: ${spaces[1]}rem 0;
                  `,
              }}
            >
              {event["pricing"]["local"]["amount"]}{" "}
              {event["pricing"]["local"]["currency"]}
            </Divider>
          </Body>
        </Divider>

        <Divider $direction="column">
          <Label>Crypto payments</Label>
          <Body>
            {event["payments"].map(({ net }) => (
              <Payment
                $amount={net["crypto"]["amount"]}
                $currency={net["crypto"]["currency"]}
              />
            ))}
          </Body>
        </Divider>
      </Divider>
    </Divider>
  );
};

export { index as Coinbase };
