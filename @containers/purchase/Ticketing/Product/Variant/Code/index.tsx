// Core
import { type FC, useEffect, useState } from "react";

// Global components
import { Divider } from "@components";

// Global icons
import { CopyIcon } from "@icons";

export const Code: FC = (code: any) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    // Disable alert
    if (isCopied === true) setTimeout(() => setIsCopied(false), 1000);
  }, [isCopied]);

  return (
    <Divider
      key={code ? code._id.toString() : undefined}
      $alignItems="center"
      $options={{
        additionalStyles: ({ spaces, colors }) => `
          padding-top: ${spaces[1]}rem;
          padding-bottom: ${spaces[1]}rem;
          font-size: 13px;
          word-break: break-all;
            
          &:not(:last-of-type) {
            border-bottom: 1px solid ${colors["border"]};
          }
	      `,
      }}
    >
      <Divider
        $alignItems="center"
        $options={{
          additionalStyles: ({ colors }) =>
            code["replacement"]
              ? `
                color: ${colors["grey"]};
                text-decoration: line-through;
              `
              : ``,
        }}
      >
        {code["status"] === 5 ? (
          <>Please contact customer support</>
        ) : (
          <>
            {code["code"]}

            {code["replacement"] && (
              <Divider
                onClick={async () => {
                  // Define text
                  const text = code["code"].toString();

                  // Check if we're on a browser
                  if (navigator) {
                    await navigator.clipboard.writeText(text).then(() => {
                      // If it's copied successfully
                      setIsCopied(true);
                    });
                  }
                }}
                $options={{
                  additionalStyles: ({ spaces }) => `
                    cursor: pointer;
                    margin-left: ${(spaces[1] as number) / 2}rem;
                    margin-right: ${(spaces[1] as number) / 2}rem;
                    &:active {
                      transform: scale(0.9);
                    }
                  `,
                }}
              >
                <CopyIcon
                  $color={code.replacement ? "grey" : "secondary"}
                  $size={20}
                />
              </Divider>
            )}

            {code["replacement"] && (
              <Divider
                $options={{
                  additionalStyles: ({ spaces }) => `
                    margin-left: ${spaces[1]}rem;
                    margin-right: ${(spaces[1] as number) / 2}rem;
                  `,
                }}
              >
                {code["replacement"]}
              </Divider>
            )}

            <Divider
              $extends="button"
              onClick={async () => {
                // Define text
                const text = code["replacement"]
                  ? code["replacement"]
                  : code["code"].toString();

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
                      right: 25px;
                      top: 50%;
                      width: 105px;
                      padding: ${(spaces[1] as number) / 2}rem;
                      background-color: ${colors["border"]};
                      display: flex;
                      align-items: center;
                      justify-content: center;
                  
                      &:after {
                        width: 0; 
                        height: 0; 
                        right: -5px;
                        border-top: 5px solid transparent;
                        border-bottom: 5px solid transparent;
                        border-left: 5px solid ${colors["border"]};
                        content: "";
                        position: absolute;      
                      }
                  
                      ${
                        isCopied
                          ? `transform: translateY(-50%) translateX(0);`
                          : `transform: translateY(-50%) translateX(5px);`
                      }
                    `,
                  }}
                >
                  Code copied
                </Divider>
              )}

              {/* Copy button */}
              <CopyIcon $size={20} $color="primary" />
            </Divider>
          </>
        )}
      </Divider>
    </Divider>
  );
};
