// Core types
import type { FC } from "react";

// Vendors
import { FieldArray, useFormikContext } from "formik";
import styled, { css } from "styled-components";
import mongoose from "mongoose";

// Global components
import { Label, Divider, Button } from "@components";

// Local component
import { Variant } from "./Variant";

// Global types
import { Plus } from "@icons";
import { IProductFields } from "..";

interface Variants {}

const index: FC<Variants> = () => {
  //
  const { values, errors, touched } = useFormikContext<IProductFields>();

  return (
    <Divider $direction="column">
      <Divider
        $color={errors?.variants && touched?.variants ? "danger" : "secondary"}
      >
        <Label>Product variants:</Label>
      </Divider>

      <FieldArray
        name="variants"
        render={(arrayHelpers) => {
          return (
            <>
              {values.variants.map((el, index) => (
                <Variant
                  {...el}
                  key={el._id.toString()}
                  remove={() => arrayHelpers.remove(index)}
                  index={index}
                />
              ))}

              <Divider>
                <Button
                  $variant="primary"
                  $style="outline"
                  type="button"
                  icon={{
                    $icon: "plus",
                    $size: 20,
                    $color: "secondary",
                  }}
                  onClick={() => {
                    arrayHelpers.push({
                      _id: new mongoose.Types.ObjectId(),
                      name: "",
                      price: 0,
                    });
                  }}
                >
                  Add new variant
                </Button>
              </Divider>
            </>
          );
        }}
      />
    </Divider>
  );
};

export { index as Variants };
