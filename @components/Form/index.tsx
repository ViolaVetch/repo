// Local exports
export { Field } from "@components/Form/Field";

// Core types
import { FC } from "react";

// Global components
import { Divider } from "@components";

// Vendors
import styled, { css } from "styled-components";
import { Formik, Form } from "formik";
import { object, number, string, bool, array } from "yup";

const yupMethods: any = {
  number,
  string,
  bool,
  array,
};

// Local components
import { Field } from "@components/Form";
import { Button } from "@components";

// Global types
import { Field as Fieldtype, Validation as Validationtype } from "@types";

interface Values {
  [x: string]: any;
}

const Prelabel = styled.h6`
  font-size: 20px;
  line-height: 30px;

  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    font-weight: ${font.weight["semiBold"]};
    margin-bottom: ${defaults.gutter / 2}px;
  `}
`;

const generateValidations = (fields: Fieldtype[]) => {
  // Map fields
  return fields.reduce((schema, { validation, name }) => {
    // We can't extract validations and type directly from
    // validation because we share the type on different
    // form fields which may not have validation
    let validations, type;

    // Populate validations
    if (validation) validations = validation.validations;
    if (validation) type = validation.type;

    // If validation or validation type do not exist
    if (!validation || !type) return schema;

    // If yup method does not exist
    if (!yupMethods[type]) return schema;

    // Consolidate validator
    let validator: any = yupMethods[type]();

    // Create function for each validator
    Array.isArray(validations)
      ? validations.map(
          ({
            validations: validationValidations,
            ...validation
          }: Validationtype) => {
            const { params, type } = validation;

            // If validator does not exist, break the loop
            if (!validator[type]) {
              return;
            }

            // If validator exists, assign it
            if (params) validator = validator[type](...params);

            // If validator has deeper validations
            if (validationValidations) {
              Array.isArray(validationValidations)
                ? validationValidations.map(
                    (validationValidationsValidation) => {
                      if (!validator[validationValidationsValidation.type]) {
                        return;
                      }

                      if (validationValidationsValidation.params)
                        validator = validator[type](
                          ...validationValidationsValidation.params
                        );
                    }
                  )
                : null;
            }
          }
        )
      : null;

    // Return the reduced validation
    return { ...schema, [name]: validator };
  }, {});
};

// Global types
import { FieldStyle } from "@types";

interface Formtype extends FieldStyle {
  autoComplete: string;
  fields: Fieldtype[];
  initialValues: Values;
  onSubmit: Function;
  options?: {
    enableReinitialize: boolean;
  };
  button: {
    label: string;
    labelSubmitting: string;
  };
}

const index: FC<Formtype> = ({
  autoComplete,
  fields,
  button,
  onSubmit,
  initialValues,
  options,
  $variant,
}) => {
  return (
    <Formik
      {...options}
      initialValues={initialValues}
      validationSchema={object(generateValidations(fields))}
      onSubmit={(values, helpers) => {
        onSubmit(values, helpers);
      }}
    >
      {({ isSubmitting, errors }) => (
        <Form autoComplete={autoComplete}>
          <Divider
            $direction={$variant === "static" ? "row" : "column"}
            $options={{
              additionalStyles: () => `
                flex-wrap: wrap;
                z-index: 10;
              `,
            }}
          >
            {Array.isArray(fields)
              ? fields.map((field, index) => (
                  <Divider
                    $direction="column"
                    key={field.name}
                    $margin={{ bottom: 2 }}
                    $options={{
                      additionalStyles: ({ defaults }) => `
                        z-index: -${index};
                        ${
                          $variant === "static" &&
                          `
                          flex: 0 0 50%;
                          &:nth-of-type(2n) {
                            padding-left: 30px;
                          }
                        `
                        }
                      `,
                    }}
                  >
                    {field.preLabel && (
                      <Prelabel key={field.preLabel}>{field.preLabel}</Prelabel>
                    )}

                    <Field {...field} {...{ $variant, index }} />
                  </Divider>
                ))
              : "No fields found"}
          </Divider>

          <Divider $alignItems="flex-start">
            <Button disabled={isSubmitting} $variant="primary" type="submit">
              {isSubmitting ? button.labelSubmitting : button.label}
            </Button>
          </Divider>
        </Form>
      )}
    </Formik>
  );
};

export { index as Form };
