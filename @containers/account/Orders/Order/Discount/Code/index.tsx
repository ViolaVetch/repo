// Core
import { useEffect, useState } from "react";

// Core types
import type { FC } from "react";

// Global components
import { Divider } from "@components";

// Global icons
import { CopyIcon } from "@icons";
export const Code: FC<{ code: any }> = ({ code }) => {
  const [IsCopied, setIsCopied] = useState<boolean>();

  useEffect(() => {
    // Disable alert
    if (IsCopied === true) setTimeout(() => setIsCopied(false), 1000);
  }, [IsCopied]);

  return (
    <Divider>
      {/* Alert */}
      {IsCopied && (
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
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-color: ${colors["secondary"]};
                  color: ${colors["white"]};
  
                  &:after {
                      border-top: 5px solid ${colors["secondary"]};
                      border-left: 5px solid transparent;
                      border-right: 5px solid transparent;
                      width: 0; 
                      height: 0; 
                      right: calc(50% - 2.5px);
                      bottom: -5px;
                      content: "";
                      position: absolute;
                  }
                `,
          }}
        >
          Code copied
        </Divider>
      )}

      <Divider
        onClick={async () => {
          // Define text
          const text = code.toString();

          // Check if we're on a browser
          if (navigator) {
            await navigator.clipboard.writeText(text).then(() => {
              // If it's copied successfully
              setIsCopied(true);
            });
          }
        }}
        $alignItems="center"
        $padding={1}
        $margin={{ left: 1, right: 1 }}
        $options={{
          additionalStyles: ({ colors, defaults, font }) => `
                          background-color: rgba(255,255,255,.15);
                          color: ${colors["white"]};
                          border-radius: ${defaults["radius"] / 2}px;
                          cursor: pointer;
  
                          &:hover {
                            background-color: rgba(255,255,255,.30);
                          }
  
                          &:active {
                            transform: scale(0.96);
                          }
                        `,
        }}
      >
        {code}
        <Divider $margin={{ left: 1 }}>
          <CopyIcon $color="white" $size={20} />
        </Divider>
      </Divider>
    </Divider>
  );
};
