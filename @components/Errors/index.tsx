// Core types
import { type FC, Fragment } from "react";

// Global components
import { Divider } from "@components";

/**
 * Works ONLY as a Formik child
 * @param errors accepts Formik "errors" object
 * @returns JSX.Component - styled errors list
 */
const index: FC<Object> = (errors) => {
  type TReducer = { [x: string]: string | TReducer }[];

  const Reducer = (t: Object): TReducer =>
    t &&
    Object.entries(t).reduce(
      (prev: TReducer, [key, val]: [string, TReducer | string]) => {
        let response: TReducer;

        if (Array.isArray(val)) {
          response = [{ [key]: val.map((el, i) => ({ [i]: Reducer(el) })) }];
        } else {
          response = [{ [key]: val }];
        }

        if (prev) response = [...prev, ...response];

        return response;
      },
      []
    );

  const Error: FC<{ errors: TReducer; $length?: number }> = ({
    errors,
    $length,
  }) => {
    const children = errors.map((el) =>
      Object.entries(el).map(([key, val], index) =>
        Array.isArray(val) ? (
          <Fragment>
            {/* Main name */}
            {isNaN(parseInt(key)) && (
              <Divider
                $margin={{ top: 1 }}
                $options={{
                  additionalStyles: ({ colors }) => `
                    color: ${colors["danger"]};
                  `,
                }}
              >
                The following error(s) found on {key}:
              </Divider>
            )}

            <Error errors={val} $length={val.length} />
          </Fragment>
        ) : $length && $length > 0 ? (
          <Divider
            $options={{
              additionalStyles: ({ spaces, colors }) => `
                padding-left: ${spaces[1]}rem;
                padding-right: ${spaces[1]}rem;
                background-color: ${colors["danger"]}10;
            
                &:first-of-type {
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                  margin-top: ${(spaces[1] as number) / 2}rem;
                  padding-top: ${spaces[1]}rem;
                }
      
                &:last-of-type {
                  border-bottom-left-radius: 6px;
                  border-bottom-right-radius: 6px;
                  margin-bottom: ${(spaces[1] as number) / 2}rem;
                  padding-bottom: ${spaces[1]}rem;
                }
              `,
            }}
          >
            {val}
          </Divider>
        ) : (
          <Divider key={val}>{val}</Divider>
        )
      )
    );

    if ($length && $length > 1) {
      return <Divider $direction="column">{children}</Divider>;
    }

    return (
      <Divider
        $direction="column"
        $options={{
          additionalStyles: ({ colors }) => `
            font-size: 13px;
            color: ${colors["secondary"]};
            width: 100%;
          `,
        }}
      >
        {children}
      </Divider>
    );
  };

  return (
    <Divider
      $direction="column"
      $options={{
        additionalStyles: ({ defaults, colors, spaces }) => `
          position: relative;
          width: 100%;
          background-color: ${colors["danger"]}10;
          color: ${colors["danger"]};
          border-radius: ${defaults["radius"]}px;
            
          margin-top: ${spaces[2]}rem;
          margin-bottom: ${spaces[2]}rem;
            
          padding: ${spaces[4]}rem ${spaces[4]}rem ${spaces[4]}rem ${
          spaces[6]
        }rem;
            
          &:before {
            width: 4px;
            height: calc(100% - ${spaces[4]}rem);
            top: ${(spaces[4] as number) / 2}rem;
            left: ${(spaces[4] as number) / 2}rem;
            background-color: ${colors["danger"]};
            border-radius: ${defaults["radius"]}px;
            content: "";
            position: absolute;
          }
        `,
      }}
    >
      <Divider>
        The following error(s) must be corrected before continuing:
      </Divider>
      <Divider $padding={{ top: 2, left: 2, right: 2 }}>
        <Error errors={Reducer(errors)} />
      </Divider>
    </Divider>
  );
};

export { index as Errors };
