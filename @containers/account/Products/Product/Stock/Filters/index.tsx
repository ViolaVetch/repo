// Core
import { Fragment, useState } from "react";
import { useRouter } from "next/router";

// Global icons
import { ActivityIcon, Empty, Change } from "@icons";

// Global components
import { Button, Options, Divider, Separator, Icon } from "@components";

// Global controllers
import { useFormikContext } from "formik";

// Local types
import { type IProductFields } from "../..";

// Vedors
import { useSession } from "next-auth/react";

export const Filters = () => {
  const { push } = useRouter();

  const { data: session } = useSession();

  // Grab local form context variants
  const { values, setFieldValue } = useFormikContext<IProductFields>();

  const [isStatusOpen, setIsStatusOpen] = useState(false);

  return (
    <Fragment>
      <Button
        $variant="primary"
        $style="outline"
        type="button"
        onClick={() => push(`/account/products/${values["_id"]}`)}
        icon={{
          $icon: "arrow-left",
          $size: 20,
        }}
      >
        Back
      </Button>

      <Separator $axis={{ xs: "x", sm: "x", md: "y" }} $margin={2} />

      <Divider
        $margin={{
          md: { left: 1, right: 1 },
        }}
        $options={{
          additionalStyles: ({ breakpoints }) => `
            @media (max-width:${breakpoints["md"]}px) {
             button {
              width: 100%;
             } 
            }
          `,
        }}
      >
        <Button
          $variant="primary"
          $style="outline"
          type="button"
          onClick={(e: any): void => {
            setIsStatusOpen(!isStatusOpen);
          }}
        >
          <Change $color="primary" $size={19} />

          {values["currentVariant"]
            ? values["currentVariant"].name
            : "Select variant"}
        </Button>

        {isStatusOpen && (
          <Options
            close={() => setIsStatusOpen(false)}
            style={{ marginTop: ".5em" }}
            items={values?.variants.map((el: any) => ({
              name: el.name,
              selected: el === values["currentVariant"],
              icon: <ActivityIcon $size={20} />,
              action: () => {
                // Update current variant that we're editing
                setFieldValue("currentVariant", el);
                // Hide popup
                setIsStatusOpen(false);
              },
            }))}
          />
        )}
      </Divider>

      {session?.user["role"] === "admin" && (
        <Divider
          $margin={{ xs: { top: 1 }, sm: { top: 1 }, md: { top: 0, left: 1 } }}
          $alignItems="center"
          $justifyContent="center"
          $options={{
            additionalStyles: ({ breakpoints, colors, spaces }) => `
              color: ${colors["danger"]};
              border: 1px solid ${colors["danger"]};
              padding: ${spaces[2]}rem;
              cursor: pointer;
              border-radius: 30px;
              
              &:hover {
                background-color: ${colors["danger"]}10;
              }

              svg {
                margin-right: ${(spaces[1] as number) / 1.5}rem;
              }

              @media (min-width: ${breakpoints["sm"]}px) {
              } 
            `,
          }}
          onClick={() => {
            const filterCodes = values["codes"].filter(
              (el) => el.variant !== values["currentVariant"]?._id
            );

            setFieldValue("codes", filterCodes);
          }}
        >
          <Empty $color="danger" $size={19} />
          Empty Variant
        </Divider>
      )}
      <Separator $axis={{ xs: "x", sm: "x", md: "y" }} $margin={2} />

      <Button
        $variant="primary"
        type="submit"
        icon={{
          $icon: "save",
          $size: 20,
          $color: "white",
        }}
      >
        Save changes
      </Button>
    </Fragment>
  );
};
