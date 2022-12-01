// Core
import { Fragment, useEffect, useMemo, useState } from "react";

// Core types
import type { FC } from "react";

// Global components
import { Divider, Heading } from "@components";

// Global form component
import { Field } from "@components/Form/Field";

// Global icons
import { PagesIcon } from "@icons";

// Local container imports
import type { IResellerFields } from "..";

// Vendors
import { useFormikContext } from "formik";

// Global styles
import { generateSlug } from "@utils/shared";

// Global utilities
import { getDomain } from "@utils/client";

interface Password {}

const index: FC<Password> = () => {
  // Destructure formik's context
  const { values, setFieldValue } = useFormikContext<IResellerFields>();

  const [domain, setDomain] = useState("");
  const domainmemo = useMemo(() => domain, [domain]);

  // Check if the page name is a subdomain
  const [HasCustomSlug, setHasCustomSlug] = useState(
    values["settings"]?.subdomain ? values["settings"]?.subdomain : false
  );

  // Slug, memoize it or regenerate it
  const [Slug, setSlug] = useState<string | undefined>(values["slug"]);
  const slug = useMemo(
    () => (Slug ? Slug : generateSlug({ length: 7 })),
    [Slug]
  );

  // Regenerate slug
  const regenSlug = () => setSlug(generateSlug({ length: 7 }));

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(`${getDomain("withProtocol")}/products?seller=`);
    }

    if (values["store"] && values["mode"] === "add")
      setFieldValue("slug", `${values["store"]}-${slug}`);
  }, [values["store"], slug]);

  return (
    <Divider $direction="column">
      {/* Header */}
      <Divider>
        <Heading
          $as="h5"
          $margin={{ top: 2, bottom: 3 }}
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
          <Fragment>
            <PagesIcon $size={30} $color="primary" />

            <Divider
              $direction="column"
              $options={{
                additionalStyles: ({ spaces }) => `
                      padding-left: ${spaces[1] as number}rem;
                    `,
              }}
            >
              Unique seller link
              <Heading
                $as="p"
                $options={{
                  additionalStyles: ({ colors }) => `
                        font-size: 13px;
                        line-height: 13px;
                        color: ${colors["grey"]}
                    `,
                }}
              >
                {
                  {
                    add: "A unique seller link will be generated as seen below.",
                    update: "Please update carefully your unique link",
                  }[values["mode"]]
                }
              </Heading>
            </Divider>
          </Fragment>
        </Heading>
      </Divider>

      <Divider
        $direction="column"
        $margin={{ bottom: 4 }}
        $padding={2}
        $options={{
          additionalStyles: ({ defaults }) => `
            flex: 0 0 100%;
            background-color: #f4f5f7;
            border-radius: ${defaults["radius"]}px;
          `,
        }}
      >
        {/* Header */}
        <Divider
          $alignItems="center"
          $padding={1}
          $margin={{ md: { left: "auto", right: "auto" }, bottom: 2 }}
          onClick={() => setHasCustomSlug(!HasCustomSlug)}
          $options={{
            additionalStyles: ({ defaults, breakpoints }) => `
                cursor: pointer;
                background-color: rgba(255,255,255,.75);
                border-radius: ${defaults["radius"] * 4}px;

                
                @media(max-width:${breakpoints["md"]}px) {
                  flex-direction: column;                        
                }
              `,
          }}
        >
          <Divider
            $options={{
              additionalStyles: ({ spaces, defaults, colors, breakpoints }) => `
                position: absolute;
                width: 250px;
                height: calc(100% - ${(spaces[1] as number) * 2}rem);
                top: ${spaces[1]}rem;
                background-color: ${colors["primary"]};
                border-radius: ${defaults["radius"] * 4}px;
                transition: all 200ms ease-in-out;

                @media(max-width:${breakpoints["md"]}px) {
                 display: none; 
                }

                ${
                  HasCustomSlug
                    ? `
                      left: calc(250px + ${(spaces[1] as number) * 3}rem);
                      width: 150px;
                    `
                    : `
                      width: 250px;
                      left: ${spaces[1]}rem;
                    `
                }
              `,
            }}
          ></Divider>

          <Divider
            $extends="button"
            onClick={() => regenSlug()}
            $margin={{ right: 1 }}
            $padding={2}
            $justifyContent="center"
            $options={{
              additionalStyles: ({ defaults, colors, breakpoints }) => `
                transform-origin: center center;
                width: 250px;
                color: ${colors[HasCustomSlug ? "secondary" : "white"]};
                border-radius: ${defaults["radius"]}px;
                opacity: ${HasCustomSlug ? "0.5" : "1"};
                transition: all 200ms ease-in-out;

                @media(max-width:${breakpoints["md"]}px) {
                  width: 100%;
                  ${!HasCustomSlug && `background-color: ${colors["primary"]}`}
                }
              `,
            }}
          >
            Automatically generated
          </Divider>

          <Divider
            $extends="button"
            $margin={{ left: 1 }}
            $padding={2}
            $justifyContent="center"
            $options={{
              additionalStyles: ({ defaults, colors, breakpoints }) => `
                transform: center center;
                width: 150px;
                color: ${colors[HasCustomSlug ? "white" : "secondary"]};
                border-radius: ${defaults["radius"]}px;
                opacity: ${HasCustomSlug ? "1" : "0.5"};
                transition: all 200ms ease-in-out;
                @media(max-width:${breakpoints["md"]}px) {
                  width: 100%;
                  ${HasCustomSlug && `background-color: ${colors["primary"]}`}
                }
              `,
            }}
          >
            Custom slug
          </Divider>
        </Divider>

        <Field
          $copy
          $pre={domainmemo}
          $variant="static"
          label="Your page link"
          type={HasCustomSlug ? "text" : "disabled"}
          name="slug"
        />
      </Divider>
    </Divider>
  );
};

export { index as Page };
