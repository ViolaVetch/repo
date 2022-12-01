// Core types
import { FC, Fragment } from "react";

// Vendors
import { useFormikContext } from "formik";

// Global components
import { Divider } from "@components";

// Global form component
import { Field } from "@components/Form/Field";

// Global types
import { IUserWallet, ICurrency } from "@types";

// Global styles
import { Label, Field as FieldStyle, Icon } from "@styles";

// Global icons
import { ArrowDown, DeleteIcon } from "@icons";

// Local container imports
import type { IResellerFields } from "@containers/account/Resellers/Reseller";

interface Wallet extends IUserWallet {
  $remove: () => void;
  $currencies: ICurrency[];
  $index: number;
}

const index: FC<Wallet> = ({ $currencies, $index, $remove }) => {
  const { values, setFieldValue } = useFormikContext<IResellerFields>();

  // Map through current wallets and display what is left to be added
  const available = values["wallets"]?.map((el) => el.currency?._id);

  // Current object
  const current = values["wallets"] && values["wallets"][$index];

  return (
    <Divider $options={{ flex: 1 }} $padding={{ right: 1, bottom: 2 }}>
      <Divider
        $direction="column"
        $margin={{ right: 2 }}
        $options={{
          additionalStyles: ({ spaces, defaults }) => `
            flex: 1;

            ${Label}{
              margin-bottom: 0;
            }

            ${FieldStyle} {
              appearance: none;
              border-radius: ${defaults["radius"]}px;
              flex: 1;
              padding-left: ${spaces[1]}rem;
            }

            ${Icon} {
              position: absolute;
              z-index: 10;
              right: 10px;
              pointer-events: none;
              bottom: 14px;
            }
          `,
        }}
      >
        {(current?.currency as ICurrency)?.name ? (
          <Divider>
            <Field
              $variant="static"
              type="text"
              label="Currency *"
              disabled
              name={`wallets[${$index}].currency.name`}
            />
          </Divider>
        ) : (
          <Fragment>
            <Label>Currency *</Label>

            <FieldStyle
              as="select"
              name={`wallets[${$index}].currency`}
              defaultValue="none"
              onChange={(e: any) =>
                setFieldValue(
                  `wallets[${$index}].currency`,
                  $currencies?.filter(
                    (wallet) => wallet._id === e.target.value
                  )[0]
                )
              }
            >
              <option disabled value="none">
                Select a wallet
              </option>
              {$currencies
                ?.filter((wallet) => !available?.includes(wallet._id))
                .map((el) => (
                  <option key={el.name} value={el._id.toString()}>
                    {el.name}
                  </option>
                ))}
            </FieldStyle>
            <ArrowDown $color="secondary" $size={13} />
          </Fragment>
        )}
      </Divider>

      <Divider
        $options={{
          additionalStyles: () => `
            flex: 2;
          `,
        }}
      >
        <Field
          $variant="static"
          label="Wallet *"
          type="text"
          autoComplete="do-not-autofill"
          name={`wallets[${$index}].addr`}
        />
      </Divider>

      <Divider
        $alignItems="center"
        $margin={{ sm: { left: 1 } }}
        onClick={() => $remove()}
        $options={{
          additionalStyles: () => `
            padding-top: 2  0px;
            cursor: pointer;
          `,
        }}
      >
        <DeleteIcon />
      </Divider>
    </Divider>
  );
};

export { index as Wallet };
