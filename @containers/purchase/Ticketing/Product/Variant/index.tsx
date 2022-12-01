// Core
import { type FC, useEffect, useState, Fragment } from "react";

// Global components
import { Divider } from "@components";

// Local components
import { Code } from "./Code";
import { CopyIcon } from "@icons";

// Global types
import { ICode, IVariant } from "@types";

interface Props extends IVariant {
  $status: string;
}

const index: FC<Props> = ({ $status, ...variant }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    // Disable alert
    if (isCopied === true) setTimeout(() => setIsCopied(false), 1000);
  }, [isCopied]);

  const codes = variant.codes?.reduce((prev, next) => {
    const n = `${next.code}\n`;

    return [...prev, n];
  }, [] as string[]);

  const Codes: FC = () => {
    switch ($status) {
      case "confirmed":
      case "unfulfilled":
        return (
          <Fragment>
            {variant.codes &&
              variant.codes.map((code: ICode) => (
                <Code key={code["_id"].toString()} {...code} />
              ))}
          </Fragment>
        );
      case "failed":
        return (
          <Divider
            $padding={1}
            $options={{
              additionalStyles: ({ colors }) => `
               color: ${colors["danger"]};
               font-size: 13px;
             `,
            }}
          >
            Purchase failed, please contact customer support, or try purchasing
            the products again.
          </Divider>
        );
      default:
        return (
          <Divider
            $padding={1}
            $options={{
              additionalStyles: () => `
                font-size: 13px;
                opacity: 0.75;
              `,
            }}
          >
            Products will appear here when the purchase is marked as completed.
          </Divider>
        );
    }
  };

  return (
    <Divider
      key={variant._id.toString()}
      $margin={{ bottom: 1 }}
      $direction="column"
      $options={{
        additionalStyles: ({ colors }) => `
          width: 100%;
          border-radius: 17px;
          border: 1px solid ${colors["border"]};
      `,
      }}
    >
      {/* Variant head */}
      <Divider
        $padding={{ top: 1, right: 2, bottom: 1, left: 2 }}
        $options={{
          additionalStyles: ({ colors, font }) => `
            background-color: ${colors["border"]};
            border-top-left-radius: 17px;
            border-top-right-radius: 17px;
            font-weight: ${font["weight"]["semiBold"]}
          `,
        }}
      >
        {variant.name}

        {codes && (
          <Divider
            $extends="button"
            $margin={{ left: "auto" }}
            onClick={async () => {
              // Define text
              const text = codes.join("").replaceAll(" ", "");

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
                  border-radius: 30px;
                  position: absolute;
                  box-shadow: 0 0 19px rgba(0,0,0,.075);
                  right: calc(50% - 70px);
                  bottom: 100%;
                  width: 140px;
                  padding: ${spaces[1] as number}rem;
                  background-color: ${colors["white"]};
                  justify-content: center;
                `,
                }}
              >
                Codes copied
              </Divider>
            )}

            {/* Copy button */}
            <CopyIcon $size={20} $color="primary" />
          </Divider>
        )}
      </Divider>

      {/* Variant body */}
      <Divider
        $direction="column"
        $options={{
          additionalStyles: ({ spaces }) => `
            padding-left: ${spaces[1]}rem;
            padding-right: ${spaces[1]}rem;
          `,
        }}
      >
        <Codes />
      </Divider>
    </Divider>
  );
};

export { index as Variant };
