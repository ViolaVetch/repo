// Core
import { useState, useEffect, useRef, useContext } from "react";

// Core types
import type { FC } from "react";

// Vendors
import { useFormikContext } from "formik";

// Global components
import { Divider } from "@components";
import { CopyIcon, More, Replacement } from "@icons";

// Local types
import { IOrder, ICode } from "@types";
import { useDispatch } from "react-redux";
import { postItems } from "@methods/postItems";
import { putItems } from "@methods/putItems";

const index: FC<any> = ({ productIndex, variantIndex, codeIndex }) => {
  //
  const dispatch = useDispatch();

  // Handle replacement loading
  const [ReplacementLoading, setReplacementLoading] = useState<boolean>(false);

  // Find current code's full name through indexes
  const currentFieldName = `products[${productIndex}].variants[${variantIndex}].codes[${codeIndex}]`;

  // Import form context to manage code
  const { values, setFieldValue, getFieldMeta } = useFormikContext<IOrder>();

  // Export current field values
  const currentField = getFieldMeta<ICode>(currentFieldName).value;

  // Check if code is copied
  const [IsCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Disable alert
    if (IsCopied === true) setTimeout(() => setIsCopied(false), 1000);
  }, [IsCopied]);

  // Manage settings popover
  const [IsVisible, setIsVisible] = useState<boolean>();

  const ref = useRef<HTMLDivElement>(null);
  const toggleIcon = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: { target: any }) => {
    if (
      ref.current &&
      !ref.current?.contains(event.target) &&
      !toggleIcon.current?.contains(event.target)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  // Replace code
  const handleReplacementIssue = async () => {
    // Destructure current code
    const current =
      values.products[productIndex].variants[variantIndex].codes[codeIndex];

    // Create a replacement
    postItems({
      data: { product: values.products[productIndex], code: currentField },
      setLoading: setReplacementLoading,
      dispatch,
      model: "order/code",
      onSuccess: ({ data }) => {
        console.log(data);

        if (data["items"].length > 0) {
          const [replacement] = data["items"];

          // Replace code on the client
          setFieldValue(currentFieldName, {
            ...current,
            replacement,
          });
          // Assign "issuesReplaced" key
          setFieldValue("issuesReplaced", false);
        }
      },
    });
  };

  // Undo replacement
  const handleReplacementUndo = async () => {
    // Destructure current code
    const { replacement, ...current } =
      values.products[productIndex].variants[variantIndex].codes[codeIndex];

    // Create a replacement
    putItems({
      data: { product: values.products[productIndex], code: currentField },
      target: currentField["_id"],
      setLoading: setReplacementLoading,
      dispatch,
      model: "order/code",
      onSuccess: ({ data }) => {
        if (data["items"].length > 0) {
          // Undo replacement front
          setFieldValue(currentFieldName, {
            ...current,
          });
        }
      },
    });
  };

  return (
    <Divider
      $alignItems="center"
      $padding={{ top: 1, right: 2, bottom: 1, left: 2 }}
      $options={{
        additionalStyles: ({ colors, defaults }) => `
            background-color: #f5f7f9;
            &:not(:last-of-type) {
                border-bottom: 1px solid ${colors["border"]};
            }
            &:last-of-type {
                border-bottom-left-radius: ${defaults["radius"]}px;
                border-bottom-right-radius: ${defaults["radius"]}px;
            }
        `,
      }}
    >
      <Divider
        $options={{
          additionalStyles: ({ spaces }) => `
              font-size: 14px;
          `,
        }}
      >
        {/* Current code */}
        <Divider
          $alignItems="center"
          $options={{
            additionalStyles: ({ colors }) => `
              
              ${
                currentField.replacement &&
                `
                  color: ${colors["grey"]};
                  text-decoration: line-through;
                `
              }
            `,
          }}
        >
          {currentField.code}

          <Divider
            onClick={async () => {
              // Define text
              const text = currentField.code.toString();

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
              $color={currentField.replacement ? "grey" : "secondary"}
              $size={20}
            />
          </Divider>
        </Divider>

        {/* Replacement code if any */}
        {currentField.replacement && (
          <Divider $alignItems="center" $color="primary">
            {currentField["replacement"]["code"]}

            <Divider
              onClick={async () => {
                // Define text
                const text = currentField.code.toString();

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
              <CopyIcon $size={20} />
            </Divider>
          </Divider>
        )}

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
      </Divider>

      {/* Settings Popover */}
      <Divider $margin={{ left: "auto" }}>
        <Divider
          ref={toggleIcon}
          onClick={() => setIsVisible(!IsVisible)}
          $options={{
            additionalStyles: () => `
              cursor: pointer;
              &:active {
                  transform: scale(0.9);
              }
            `,
          }}
        >
          <More $color="primary" />
        </Divider>

        {IsVisible && (
          <Divider
            $options={{
              additionalStyles: ({ colors, defaults }) => `
                background-color: ${colors["white"]};
                border-radius: ${defaults["radius"] / 2}px;
                box-shadow: 0 0 15px rgba(0,0,0,.015);
                position: absolute;
                right: 0;
                top: 100%;
                min-width: 100px;
                z-index: 5;
              `,
            }}
          >
            <Divider
              ref={ref}
              $padding={2}
              $color="secondary"
              onClick={async () => {
                if (currentField.replacement) {
                  // If we have a replacement, remove it
                  await handleReplacementUndo();
                } else {
                  // If we don't have one, add it
                  await handleReplacementIssue();
                }

                // Remove popover
                setIsVisible(!IsVisible);
              }}
              $options={{
                additionalStyles: () => `
                  cursor: pointer;

                  &:hover {
                    background-color: rgba(0,0,0,.015) ;
                  }
                `,
              }}
            >
              <Divider $margin={{ right: 1 }}>
                <Replacement $color="secondary" $size={20} />
              </Divider>

              {currentField.replacement
                ? "Undo replacement"
                : "Issue replacement"}
            </Divider>
          </Divider>
        )}
      </Divider>
    </Divider>
  );
};

export { index as Code };
