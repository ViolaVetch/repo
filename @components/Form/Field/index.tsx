// Core
import { useEffect, useState, Fragment } from "react";

// Core Types
import type { FC } from "react";

// Vendors
import { useField } from "formik";
import styled, { css } from "styled-components";

// Local components
import { Error } from "@components/Form/Field/Error";

// Global styles
import { Field, Label, Alert } from "@styles/Form";

// Global icons
import { SuccessIcon, ErrorIcon, CopyIcon } from "@icons";

interface LocalFieldStyleType extends FieldStyleType {
  $isActive?: boolean;
  $hasError?: boolean;
  $isLabel?: boolean;
}

const LabelContainer = styled.div<LocalFieldStyleType>`
  ${({ $variant, theme: { colors, name } }) => {
    switch ($variant) {
      case "static":
        return css``;
      default:
        return css`
          color: ${colors["secondary"]};
          opacity: 0.75;
          position: absolute;
          transform: translateY(-50%);
          top: 20px;
          left: 12px;
          transition: transform 200ms ease-in-out, top 200ms ease-in-out,
            font-size 200ms ease-in-out;
          transform-origin: top left;
          pointer-events: none;
        `;
    }
  }}

  ${({ $isActive }) =>
    $isActive &&
    css`
      top: 5px;
      transform: translateY(-100%) scale(0.7);
    `}

  ${({ $hasError, theme: { colors } }) =>
    $hasError &&
    css`
      color: ${colors["danger"]};
    `}
`;

const Fieldcontainer = styled.div<LocalFieldStyleType>`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  transition: all 200ms ease-in-out;

  ${({ $isLabel }) => css`
    ${$isLabel &&
    `
      cursor: pointer;
      align-items: center;
    `}
  `}

  ${({ $isActive }) => css`
    ${$isActive &&
    `
      transform: translateY(5px);
    `}
  `}
`;

// Global types
import { Field as Fieldtype, FieldStyle as FieldStyleType } from "@types";
import { Divider } from "@components/Divider";

interface IField extends Fieldtype {
  index?: number;
  $pre?: string;
  $copy?: boolean;
}

const index: FC<IField> = ({
  name,
  label,
  info,
  options,
  parentOptions,
  type = "text",
  autoComplete,
  children,
  index,
  toggle,
  $pre,
  $copy,
  $variant,
  ...props
}) => {
  // Grab formik field properties
  const [field, meta] = useField(name);

  // Handle error popover visibility
  const [popoverVisibility, setPopoverVisibility] = useState<boolean>(false);

  // Handle label animation
  const [isFocused, setIsFocused] = useState(false);

  // Handle value copy status
  const [IsCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Disable alert
    if (IsCopied === true) setTimeout(() => setIsCopied(false), 1000);
  }, [IsCopied]);

  const CPre = () =>
    $pre ? (
      <Divider
        $alignItems="center"
        $options={{
          additionalStyles: ({ colors, spaces, defaults, breakpoints }) => `
          background-color: ${colors["border"]};
          margin-right: ${(spaces[1] as number) / 2}rem;
          padding: ${(spaces[1] as number) / 2}rem ${spaces[2]}rem;
          color: ${colors["grey"]};
          border-radius: ${defaults["radius"]}px;
          @media(max-width:${breakpoints["sm"]}px) {
            margin-bottom: ${spaces[1]}rem;
          }
        `,
        }}
      >
        {$pre}
      </Divider>
    ) : (
      <></>
    );

  switch (type) {
    case "toggle":
      return (
        <Divider
          $direction="column"
          $options={{
            additionalStyles: () => `
                width: 100%;
              `,
          }}
        >
          {label}

          <Divider
            as="label"
            htmlFor={name}
            $alignItems="center"
            $options={{
              additionalStyles: ({ defaults, spaces, colors }: any) => `
                  border: 1px solid ${colors["border"]};
                  border-radius: ${defaults["radius"]}px;
                  cursor: pointer;

                  padding: ${(spaces[2] as number) / 2}rem ${spaces[2]}rem;

                  input {
                    visibility: hidden;
                    position: absolute;
                  }

                  &:hover {
                    background-color: rgba(0,0,0,.025);
                  }
                `,
            }}
          >
            <Divider $margin={{ right: 1 }}>
              {field.value === true ? (
                <SuccessIcon $size={20} />
              ) : (
                <ErrorIcon $size={20} />
              )}
            </Divider>

            {toggle && toggle(field.value)}

            <Field
              id={name}
              type="checkbox"
              {...props}
              {...field}
              checked={field.value}
            />

            {meta.error && meta.touched && <Alert>{meta.error}</Alert>}
          </Divider>
        </Divider>
      );

    case "checkbox":
      return (
        <Divider
          $direction="column"
          $margin={{ bottom: 2 }}
          $options={{
            additionalStyles: ({}) => `
                margin-top: -10px;
              `,
          }}
        >
          <Fieldcontainer
            $isActive={false}
            as="label"
            $isLabel={true}
            htmlFor={name}
            {...{ $variant }}
          >
            <Divider
              $margin={{ bottom: 1 }}
              $options={{
                additionalStyles: ({ colors }) => `
                    font-size: 12px;
                  `,
              }}
            >
              {label}
            </Divider>

            <Divider
              $options={{
                additionalStyles: () => ``,
              }}
            >
              <Divider $padding={{ top: 1 }}>
                <Field
                  id={name}
                  type={type}
                  {...field}
                  {...props}
                  hasError={Boolean(meta.error && meta.touched)}
                />
              </Divider>
              <Divider
                $options={{
                  additionalStyles: () => `
                      opacity: 0.75;
                    `,
                }}
              >
                {children}
              </Divider>
            </Divider>
          </Fieldcontainer>

          {meta.error && meta.touched && <Alert>{meta.error}</Alert>}
        </Divider>
      );

    case "disclaimer":
      return (
        <Divider $margin={{ bottom: 2 }}>
          <Fieldcontainer
            $isActive={false}
            $isLabel={false}
            as="label"
            {...{ $variant }}
          >
            {children}
          </Fieldcontainer>
        </Divider>
      );

    case "disabled":
      return (
        <Fragment>
          <Fieldcontainer $isActive={false} {...{ $variant }}>
            <LabelContainer
              $hasError={Boolean(meta.error && meta.touched)}
              {...{ $variant }}
            >
              {label}
            </LabelContainer>

            <Divider $direction={{ xs: "column", sm: "column", md: "row" }}>
              {$pre && (
                <Divider
                  $alignItems="center"
                  $options={{
                    additionalStyles: ({
                      colors,
                      spaces,
                      defaults,
                      breakpoints,
                    }) => `
                        background-color: ${colors["border"]};
                        margin-right: ${(spaces[1] as number) / 2}rem;
                        padding: ${(spaces[1] as number) / 2}rem ${
                      spaces[2]
                    }rem;
                        color: ${colors["grey"]};
                        border-radius: ${defaults["radius"]}px;
                        @media(max-width:${breakpoints["sm"]}px) {
                          margin-bottom: ${spaces[1]}rem;
                        }
                      `,
                  }}
                >
                  {$pre}
                </Divider>
              )}

              <Field disabled {...field} {...props} />

              {field.value && $copy && (
                <Divider
                  onClick={async () => {
                    // Check if we're on a browser
                    if (navigator) {
                      await navigator.clipboard
                        .writeText(
                          field.value
                            ? $pre
                              ? `${$pre}${field.value}`
                              : field.value
                            : ""
                        )
                        .then(() => {
                          // If it's copied successfully
                          setIsCopied(true);
                        });
                    }
                  }}
                  $margin={{ left: "auto" }}
                  $options={{
                    additionalStyles: ({ spaces }) => `
                        cursor: pointer;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        right: ${spaces[2]}rem;

                        &:active {
                          transform: translateY(-50%) scale(0.95);
                        }
                      `,
                  }}
                >
                  {IsCopied && (
                    <Divider
                      $options={{
                        additionalStyles: ({ defaults, spaces, colors }) => `
                            transition: transform 150ms ease-in-out;
                            box-shadow: 0 0 16px rgba(0,0,0,.05);
                            border-radius: ${defaults["radius"]}px;
                            position: absolute;
                            transform: translateX(-50%);
                            left: 50%;
                            font-size: 12px;
                            text-align: center;
                            color: ${colors["secondary"]};
                            bottom: 100%;
                            min-width: 110px;
                            background-color: ${colors["white"]};
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: ${(spaces[2] as number) / 1.5}rem;
                            &:after {
                              width: 0; 
                              height: 0; 
                              right: calc(50% - 10px);
                              bottom: -10px;
                              border-left: 10px solid transparent;
                              border-right: 10px solid transparent;
                              border-top: 10px solid ${colors["white"]};
                              content: "";
                              position: absolute;
                            }
                          `,
                      }}
                    >
                      Successfully copied
                    </Divider>
                  )}
                  <CopyIcon $size={25} />
                </Divider>
              )}
            </Divider>
          </Fieldcontainer>
        </Fragment>
      );

    case "textarea":
      return (
        <Fragment>
          <Fieldcontainer
            $isActive={
              $variant !== "static" ? (meta.value ? true : isFocused) : false
            }
            {...{ $variant }}
          >
            <LabelContainer
              $isActive={
                $variant !== "static" ? (meta.value ? true : isFocused) : false
              }
              $hasError={Boolean(meta.error && meta.touched)}
              {...{ $variant }}
            >
              {label}
            </LabelContainer>

            <Divider
              $direction={{ xs: "column", sm: "column", md: "row" }}
              $options={{
                additionalStyles: () => `
                      width: 100%;
                      textarea {
                        font-size: 100%;
                        resize: none;
                        min-height: 120px;
                        max-width: 100%;
                        min-width: 100%;
                      } 
                    `,
              }}
            >
              <CPre />

              <Field
                {...field}
                {...props}
                as="textarea"
                placeholder=""
                onFocus={() => {
                  setIsFocused(true);
                }}
                onBlur={() => {
                  setIsFocused(false);
                }}
                {...{ $variant }}
                hasError={Boolean(meta.error && meta.touched)}
              />
            </Divider>
          </Fieldcontainer>

          {children}
        </Fragment>
      );

    default:
      return (
        <Fragment>
          <Fieldcontainer
            $isActive={
              $variant !== "static" ? (meta.value ? true : isFocused) : false
            }
            {...{ $variant }}
          >
            <LabelContainer
              $isActive={
                $variant !== "static" ? (meta.value ? true : isFocused) : false
              }
              $hasError={Boolean(meta.error && meta.touched)}
              {...{ $variant }}
            >
              {label}
            </LabelContainer>

            <Divider
              $direction={{ xs: "column", sm: "column", md: "row" }}
              $options={{
                additionalStyles: () => `
                  width: 100%;
                `,
              }}
            >
              <CPre />

              <Field
                {...field}
                {...props}
                type={type}
                onFocus={() => {
                  setIsFocused(true);
                }}
                onBlur={() => {
                  setIsFocused(false);
                }}
                {...{ $variant }}
                id={name}
                hasError={Boolean(meta.error && meta.touched)}
              />

              {meta.error && meta.touched && (
                <Error
                  error={meta.error}
                  {...{ type, popoverVisibility, setPopoverVisibility }}
                />
              )}
            </Divider>
          </Fieldcontainer>

          {children}
        </Fragment>
      );
  }
};

export { index as Field };
