// Core types
import type { FC } from "react";

// Global components
import { Divider, Heading, Dropzone } from "@components";

// Global form component
import { Field } from "@components/Form/Field";

// Global icons
import { SettingsIcon } from "@icons";

// Redux
import { showNotification, hideNotification } from "redux/notificationSlice";

// Local container imports
import type { IWebsiteSettingsFields } from "..";

// Vendors
import { useDispatch } from "react-redux";
import { useFormikContext } from "formik";
import styled, { css } from "styled-components";

const Fieldgroup = styled(Divider)`
  flex-direction: column;
  ${({ theme: { breakpoints, spaces, colors, font, ...theme } }) => css`
    margin-bottom: ${(spaces[3] as number) / 1.25}rem;
    @media (max-width: ${breakpoints["md"]}px) {
      flex: 0 0 100%;
    }
  `}
`;

interface Password {}

const index: FC<Password> = () => {
  // Display notifications
  const dispatch = useDispatch();
  const { values, setFieldValue } = useFormikContext<IWebsiteSettingsFields>();

  return (
    <Divider
      $direction="column"
      $padding={{ top: 4, bottom: 2 }}
      $options={{
        additionalStyles: ({ colors }) => `
          border-bottom: 1px solid ${colors["border"]};
        `,
      }}
    >
      <Heading
        $as="h5"
        $margin={{ bottom: 3 }}
        $options={{
          additionalStyles: ({ colors, spaces }) => `
            display: flex;
            align-items: center;
            color: ${colors["primary"]};
            svg {
              margin-right: ${(spaces[1] as number) / 2}rem;
            }
          `,
        }}
      >
        <SettingsIcon $type="new" $size={30} />
        Appearance
      </Heading>

      <Divider
        $options={{
          additionalStyles: () => `
            flex-wrap: wrap;
            width: 100%;
          `,
        }}
      >
        <Fieldgroup
          $options={{
            additionalStyles: () => `
              z-index: 5; 
              flex: 0 0 50%;
              position: relative;
              input {
                padding-left: 50px;
              }
            `,
          }}
        >
          <Divider
            $options={{
              additionalStyles: () => `
                width: 30px;
                height: 30px;
                position: absolute;
                bottom: 7px;
                left: 8px;
                z-index: 10;
                border-radius: 10px;
                background-color: ${values["primaryColor"]};
              `,
            }}
          />
          <Field
            $variant="static"
            label="Primary color*"
            type="text"
            placeholder="HEX color, e.g. #5A41DC"
            name="primaryColor"
          />
        </Fieldgroup>

        <Fieldgroup
          $padding={{ md: { left: 2 } }}
          $options={{
            additionalStyles: () => `
              z-index: 5; 
              flex: 0 0 50%;
              input {
                padding-left: 50px;
              }
            `,
          }}
        >
          <Divider>
            <Divider
              $options={{
                additionalStyles: () => `
                width: 30px;
                height: 30px;
                position: absolute;
                bottom: 7px;
                left: 8px;
                z-index: 10;
                border-radius: 10px;
                background-color: ${values["secondaryColor"]};
              `,
              }}
            />
            <Field
              $variant="static"
              label="Secondary color"
              type="text"
              placeholder="HEX color, e.g. #222A30"
              name="secondaryColor"
            />
          </Divider>
        </Fieldgroup>
      </Divider>

      {/* Website thumbnail */}
      <Dropzone
        selectLabel="Website thumbnail"
        helper="JPG/JPEG or PNG only. Maximum file size allowed is 500KB"
        label="Website thumbnail*"
        description="Drop your image here."
        current={values["websiteThumbnail"]}
        onSuccess={(file: string) => {
          // Assign logo url
          setFieldValue("websiteThumbnail", file);
        }}
        onError={(message: string) => {
          dispatch(
            showNotification({
              message: message ? message : "Something went wrong",
              success: false,
            })
          );

          setTimeout(() => dispatch(hideNotification("")), 2500);
        }}
      />

      {/* Website logo */}
      <Dropzone
        selectLabel="Select logo"
        helper="JPG/JPEG or PNG only. Maximum file size allowed is 500KB"
        label="Upload logo *"
        description="Drop your logo here."
        current={values["websiteLogo"]}
        onSuccess={(file: string) => {
          // Assign logo url
          setFieldValue("websiteLogo", file);
        }}
        onError={(message: string) => {
          dispatch(
            showNotification({
              message: message ? message : "Something went wrong",
              success: false,
            })
          );

          setTimeout(() => dispatch(hideNotification("")), 2500);
        }}
      />

      {/* Website favicon */}
      <Dropzone
        selectLabel="Website Favicon"
        helper="PNG only. Maximum file size allowed is 500KB"
        label="Upload favicon *"
        description="Drop your image here."
        current={values["websiteFavicon"]}
        onSuccess={(file: string) => {
          // Assign favicon url
          setFieldValue("websiteFavicon", file);
        }}
        onError={(message: string) => {
          dispatch(
            showNotification({
              message: message ? message : "Something went wrong",
              success: false,
            })
          );

          setTimeout(() => dispatch(hideNotification("")), 2500);
        }}
      />
    </Divider>
  );
};

export { index as NAppearance };
