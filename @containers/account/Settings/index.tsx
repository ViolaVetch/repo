// Core
import { useContext, useState } from "react";

// Vendors
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Form } from "formik";

// Vendor types
import type { FormikHelpers } from "formik";

// Local components
import { NGeneral } from "./NGeneral";
import { NConfiguration } from "./NConfiguration";
import { NEmail } from "./NEmail";
import { NAppearance } from "./NAppearance";
import { NSocialMedia } from "./NSocialMedia";

// Global components
import { Divider, Heading, Button, Errors } from "@components";
import { Account } from "@components/Layouts";

// Global context
import { StoreContext, IInstance } from "@context";

// Global @shared utilities
import { isObjectEmpty } from "@utils/shared";

// Global methods
import { putItems } from "@methods/putItems";

export interface IWebsiteSettingsFields extends IInstance {
  // Custom fields
  submitted: boolean;
}
export const Settings = () => {
  const dispatch = useDispatch();

  // Core context
  const { instance: website, setInstance: setWebsite } =
    useContext(StoreContext);

  // Handle loader
  const [loading, setLoading] = useState(false);

  return (
    <Account>
      <Formik
        initialValues={{ ...website } as IWebsiteSettingsFields}
        validationSchema={() =>
          Yup.lazy((values: IWebsiteSettingsFields) => {
            const defaultSchema = {
              companyName: Yup.string().required("Please enter a name"),
              contactEmail: Yup.string()
                .email()
                .required("Please enter a contact email"),
              websiteTitle: Yup.string().required("Please enter a title"),
              websiteDescription: Yup.string().required(
                "Please enter a description"
              ),
              // Third-party API Configuration
              coinbaseApi: Yup.string().required("Please enter Coinbase API"),
              crispApi: Yup.string().required("Please enter Crisp API"),
              googleApi: Yup.string().required(
                "Please enter Google Tag Manger ID"
              ),
              // Email deliverability
              mailKey: Yup.string().required(
                "Please enter ElasticMail API Key"
              ),
              mailSender: Yup.string()
                .email()
                .required("Please enter a sender"),
              // Appearance
              primaryColor: Yup.string().required(
                "Please enter the mail site color"
              ),
              websiteLogo: Yup.string().required("Please enter a website logo"),
              websiteFavicon: Yup.string().required("Please enter a favicon"),
              websiteThumbnail: Yup.string().required(
                "Please enter a site thumbnail"
              ),
            };

            // Return default scheuma
            return Yup.object().shape(defaultSchema);
          })
        }
        onSubmit={async (
          data: IWebsiteSettingsFields,
          { setSubmitting }: FormikHelpers<IWebsiteSettingsFields>
        ) => {
          putItems({
            model: "websites",
            data,
            target: data._id,
            dispatch,
            onSuccess: ({ data }) => {
              if (data) {
                // Grab the returned item
                const [website] = data.items;
                // Apply website live
                setWebsite(website);
              }
            },
            setLoading,
          });
          // Disable submitting
          setSubmitting(false);
        }}
      >
        {({ errors, values, setFieldValue, submitForm }) => (
          <>
            <Divider
              $direction="column"
              $options={{
                additionalStyles: () => `width: 100%;`,
              }}
            >
              {/* Header */}
              <Divider>
                <Divider
                  $options={{
                    additionalStyles: ({ spaces, colors }) => `
                      flex: 1;
                      padding-bottom: ${spaces[2]}rem;
                      margin-bottom: ${spaces[2]}rem;
                      border-bottom: 1px solid ${colors["border"]}
                    `,
                  }}
                >
                  <Heading $as="h4">Page settings</Heading>

                  {/* Right side of the filters */}
                  <Divider $margin={{ left: "auto" }}>
                    <Button
                      type="button"
                      icon={{
                        $icon: "save",
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
                      Save changes
                    </Button>
                  </Divider>
                </Divider>
              </Divider>

              <Divider $padding={{ left: 4, right: 4 }} $options={{ flex: 1 }}>
                {!isObjectEmpty(errors) && values["submitted"] && (
                  <Errors {...errors} />
                )}
              </Divider>

              {/* Form */}
              <Form autoComplete="off">
                <Divider $direction="column">
                  {/* General settings */}
                  <NGeneral />
                  {/* Configuration, API, etc */}
                  <NConfiguration />
                  {/* Email deliverability */}
                  <NEmail />
                  {/* Social media settings */}
                  <NSocialMedia />
                  {/* Appearance */}
                  <NAppearance />
                </Divider>
              </Form>
            </Divider>
          </>
        )}
      </Formik>
    </Account>
  );
};
