// Core types
import { FC, useEffect, useState } from "react";

// Vendors
import { useFormikContext } from "formik";
import styled, { css } from "styled-components";

// Global components
import { Button, Divider, Heading } from "@components";

// Global icons
import { Replacement } from "@icons";

// Local container types
import { IOrderFields } from "../..";

// Global types
import { IOrderProduct, IVariant } from "@types";

const Textarea = styled.textarea`
  font-size: 100%;
  border-radius: 20px;
  resize: none;
  margin: 0;

  ${({ theme: { colors, spaces } }) => css`
    margin-top: ${spaces[1]}rem;
    margin-bottom: ${(spaces[1] as number) * 1.5}rem;
    border: 1px solid ${colors["border"]};
    padding: ${spaces[2]}rem;
  `}
`;

const Popup: FC<{ close: () => void }> = ({ close }) => {
  // Form submission
  const { values, setFieldValue, submitForm } =
    useFormikContext<IOrderFields>();

  const replaceIssues = async () =>
    // Submit form by sending notes
    submitForm().then(() => {
      // Disabled has issues
      setFieldValue("issuesReplaced", true);
      // Disabled has issues
      setFieldValue("notes", undefined);
      // Close form
      close();
    });

  return (
    <Divider
      $alignItems="center"
      $justifyContent="center"
      $options={{
        additionalStyles: ({ colors }) => `
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          position: fixed;
          z-index: 30;
          background-color: ${colors["secondary"]}50;
        `,
      }}
    >
      <Divider
        $direction="column"
        $options={{
          additionalStyles: ({ colors, spaces, defaults }) => `
            width: 400px;
            max-width: 100%;
            background-color: ${colors["white"]};
            padding: ${spaces[5]}rem;
            border-radius: ${defaults["radius"] * 4}px;
          `,
        }}
      >
        <Heading $as="h5">Send a note to the buyer</Heading>

        <Textarea
          onChange={(e) => setFieldValue("notes", e.target.value)}
          placeholder="e.g. Two codes were replaced"
        />

        {!values["notes"] && (
          <Divider
            $options={{
              additionalStyles: ({ spaces, colors }) => `
                color: ${colors["danger"]};
                margin-bottom: ${spaces[1]}rem;
                font-size: 13px;
              `,
            }}
          >
            Please add a note.
          </Divider>
        )}

        <Button
          $isDisabled={!values["notes"]}
          $variant="primary"
          type="button"
          onClick={() => values["notes"] && replaceIssues()}
        >
          Submit
        </Button>
      </Divider>
    </Divider>
  );
};

const index: FC<{}> = () => {
  // Form submission
  const { values, setFieldValue } = useFormikContext<IOrderFields>();

  // Handle replacement issue popu
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const replacements = values.products.reduce(
      (prev: number, current: IOrderProduct) => {
        // Go through variants and reduce them
        const productsReplacedLength = current.variants.reduce(
          (previousValue: number, currentValue: IVariant) => {
            // Find codes that are replaced
            const variantReplacementsLength = currentValue.codes.filter(
              (variant) => variant.replacement
            ).length;

            // Check if we have a pre
            return previousValue + variantReplacementsLength;
          },
          0 as number
        );
        // End of variants reducing

        return prev + productsReplacedLength;
      },
      0 as number
    );

    //   // Store replacements count
    setFieldValue("hasIssues", Boolean(replacements));
  }, [values]);

  return (
    <Divider $padding={{ top: 3 }}>
      {popup && <Popup close={() => setPopup(false)} />}

      {/* If product has issues, trigger replacement button */}
      {values["issuesReplaced"] === false && values["hasIssues"] && (
        <Divider
          $alignItems="center"
          $justifyContent="center"
          $padding={2}
          onClick={() => setPopup(true)}
          $options={{
            additionalStyles: ({ colors, defaults }) => `
              border: 2px solid ${colors["primary"]};
              border-radius: ${defaults["radius"]}px;
              flex: 2;
              color: ${colors["primary"]};           
              cursor: pointer;
              &:hover {
                background-color: ${colors["primary"]};
                color: ${colors["white"]};
                svg {
                  fill: ${colors["white"]};
                }
              }
            `,
          }}
        >
          <Replacement $size={35} />
          <Divider
            $margin={{ left: 1 }}
            $options={{
              additionalStyles: () => `
                font-size: 18px;
              `,
            }}
          >
            Issue Replacement Items
          </Divider>
        </Divider>
      )}
    </Divider>
  );
};

export { index as Replacement };
