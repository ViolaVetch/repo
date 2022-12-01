// Core types
import type { FC } from "react";

// Global components
import { Divider, Button } from "@components";

// Local container imports
import type { IUserFields } from "..";

// Vendors
import { useFormikContext } from "formik";

interface Buttons {}

const index: FC<Buttons> = () => {
  const { values, setFieldValue, submitForm } = useFormikContext<IUserFields>();

  return (
    <Divider $direction="column" $margin={{ bottom: 5 }}>
      <Divider $alignItems="flex-start" $justifyContent="flex-start">
        <Button
          type="button"
          icon={{
            $icon: values["mode"] === "add" ? "plus" : "save",
            $size: 20,
            $color: "white",
          }}
          onClick={() => {
            // Activate submitted form
            setFieldValue("submitted", true);
            // Submit form
            submitForm();
          }}
          $variant="primary"
        >
          {values["mode"] === "add" ? "Create" : "Save changes"}
        </Button>
      </Divider>
    </Divider>
  );
};

export { index as Buttons };
