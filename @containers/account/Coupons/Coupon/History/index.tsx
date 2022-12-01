// Core types
import { FC, useState, useEffect } from "react";

// Vendors
import styled, { css } from "styled-components";
import { type PopulatedDoc } from "mongoose";

// Global components
import { Divider, Empty } from "@components";
import { InfoIcon } from "@icons";
import { IOrder } from "@types";

const History = styled.div`
  flex: 0 0 100%;
  ${({ theme: { defaults, colors, font, ...theme } }) => css``}
`;

const ID: FC<{ _id: any }> = ({ _id }) => {
  // Manage copied state
  const [isCopied, setIsCopied] = useState<boolean>();

  useEffect(() => {
    // Disable alert
    if (isCopied === true) setTimeout(() => setIsCopied(false), 1000);
  }, [isCopied]);

  return (
    <Divider
      onClick={async () => {
        // Define text
        const text = _id.toString();

        // Check if we're on a browser
        if (navigator) {
          await navigator.clipboard.writeText(text).then(() => {
            // If it's copied successfully
            setIsCopied(true);
          });
        }
      }}
    >
      {/* Alert */}
      {isCopied && (
        <Divider
          $options={{
            additionalStyles: ({ defaults, spaces, colors }) => `
                transition: transform 150ms ease-in-out;
                border-radius: ${defaults["radius"] / 3}px;
                position: absolute;
                right: calc(50% - 55px);
                top: -30px;
                width: 110px;
                padding: ${(spaces[1] as number) / 2}rem;
                background-color: ${colors["border"]};
                display: flex;
                align-items: center;
                justify-content: center;
                &:after {
                  width: 0; 
                  height: 0; 
                  right: calc(50% - 2.5px);
                  bottom: -5px;
                  border-left: 5px solid transparent;
                  border-right: 5px solid transparent;
                  border-top: 5px solid ${colors["border"]};
                  content: "";
                  position: absolute;
                }
              `,
          }}
        >
          ID copied
        </Divider>
      )}
      <Divider
        $options={{
          additionalStyles: ({ colors }) => `
            color: ${colors["grey"]};
          `,
        }}
      >
        {_id.substr(0, 5)}...
      </Divider>
    </Divider>
  );
};

const index: FC<{
  history?: PopulatedDoc<IOrder>[];
}> = ({ history }) => {
  if (!history) {
    return <></>;
  }

  return (
    <History>
      {history?.length === 0 ? (
        <Empty
          heading="Coupon not used yet!"
          description="Any coupon was used until now, share them will others and then you can see them here."
        />
      ) : (
        <Divider $direction="column">
          <Divider $alignItems="center" $padding={{ bottom: 2 }}>
            <Divider $margin={{ right: 1 }}>
              <InfoIcon $size={23} $color="secondary" />
            </Divider>
            {history.length === 1
              ? "Coupon was used only once."
              : `Coupon was used ${history.length} times.`}
          </Divider>

          <Divider $direction="column">
            {history.map((order) => {
              const t: IOrder = order as IOrder;
              const [firstProduct] = t["products"];

              return (
                <Divider
                  $options={{
                    additionalStyles: ({ colors }) => `
                    border-bottom: 1px solid ${colors["border"]};
                    width: 100%;
                    &:first-of-type {
                      border-top: 1px solid ${colors["border"]};
                    }
                  `,
                  }}
                  $padding={{ top: 2, bottom: 2 }}
                >
                  <ID {...{ _id: t["_id"] }} />
                  <Divider $margin={{ left: 2 }}>
                    {t["products"].length === 1 ? (
                      <Divider>
                        Order including 1 product:{" "}
                        <Divider
                          $margin={{ left: 1 }}
                          $options={{
                            additionalStyles: ({ font }) => `
                            font-weight: ${font["weight"]["semiBold"]};
                          `,
                          }}
                        >
                          {firstProduct.name}
                        </Divider>
                      </Divider>
                    ) : (
                      <Divider>
                        Order including {firstProduct.name} and{" "}
                        {t["products"].length - 1} other products
                      </Divider>
                    )}
                  </Divider>
                </Divider>
              );
            })}
          </Divider>
        </Divider>
      )}
    </History>
  );
};

export { index as History };
