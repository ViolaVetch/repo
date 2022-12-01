// Core types
import { FC, useEffect, useMemo, useState } from "react";

// Vendors
import styled, { css } from "styled-components";

// Vendors
import { FieldArray, useFormikContext } from "formik";
import { useDispatch } from "react-redux";

// Global components
import { Divider, Heading } from "@components";

// Global methods
import { getItems } from "@methods/getItems";

// Global types
import { IAmount } from "@types";

// Get local
import { IOrderFields } from "..";

// Local components
import { Amount } from "./Amount";

const Amounts = styled.div`
  ${({ theme: { defaults, colors, font, ...theme } }) => css``}
`;

interface Amounts {}

const index: FC<Amounts> = () => {
  const dispatch = useDispatch();

  // Handle amounts laoder
  const [loading, setLoading] = useState(true);

  //  Amounts
  const [amounts, setAmounts] = useState<IAmount[]>([]);
  const amountsMemo = useMemo(() => amounts, [amounts]);

  // Grab local order values
  const { values } = useFormikContext<IOrderFields>();

  useEffect(() => {
    getItems<IAmount>({
      model: "amounts",
      query: { order: values["_id"].toString() },
      setLoading,
      dispatch,
      onSuccess: ({ data }) => setAmounts(data["items"]),
      onError: () => {},
    });
  }, []);

  return (
    <Divider $direction="column">
      {/* Header */}
      <Divider
        $direction="column"
        $padding={{ top: 3, bottom: 2 }}
        $options={{
          additionalStyles: ({ colors }) =>
            `border-top: 1px solid ${colors["border"]}`,
        }}
      >
        <Heading $as="h3">Amounts</Heading>
      </Divider>

      {/* Amounts list */}
      <Divider $direction="column">
        {amountsMemo.map((amount) => (
          <Amount key={amount["_id"].toString()} {...amount} />
        ))}
      </Divider>
    </Divider>
  );
};

export { index as Amounts };
