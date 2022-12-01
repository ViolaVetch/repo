// Global components
import { Divider, Heading, Pagination, Empty } from "@components";

// Core
import { useState, FC, useEffect, Fragment, FormEvent } from "react";

// Vendors
import styled, { css } from "styled-components";
import { FieldArray, useFormikContext } from "formik";

// Global icons
import { DeleteIcon, EditIcon } from "@icons";

// Global types
import type { ICode, TCodeStatus, ThemeColors } from "@types";

// Local types
import { type IProductStockFields } from "..";

// Local components
import { Code } from "./Code";

export const getColorByStatus = (status: TCodeStatus): ThemeColors => {
  switch (status) {
    default:
      return "success"; // Available
    case 1:
      return "grey"; // Sold
    case 2:
      return "pending"; // On hold
    case 3:
      return "danger"; // Failed
    case 4:
      return "secondary"; // Replacement
    case 5:
      return "primary"; // Unfulfilled
  }
};

export const List = () => {
  const { values } = useFormikContext<IProductStockFields>();

  const currentVariantCodes = values["codes"].filter(
    (el) => el.variant === values["currentVariant"]._id
  );

  // Handle list pagination
  const [pagination, setPagination] = useState(1);
  const skip = 6;
  const length = currentVariantCodes.length;

  // Count of different statuses
  const [available, setAvailable] = useState<number>(0);
  const [sold, setSold] = useState<number>(0);
  const [pending, setPending] = useState<number>(0);
  const [failed, setFailed] = useState<number>(0);
  const [replaced, setReplaced] = useState<number>(0);
  const [unfulfilled, setUnfulfilled] = useState<number>(0);

  useEffect(() => {
    // Reset pagination if current variant is changed
    setPagination(1);
  }, [, values["currentVariant"]]);

  useEffect(() => {
    // 0 Available (Not sold)
    setAvailable(currentVariantCodes.filter((el) => el.status == 0).length);
    // 1 Sold
    setSold(currentVariantCodes.filter((el) => el.status == 1).length);
    // 2 Pending (On hold)
    setPending(currentVariantCodes.filter((el) => el.status == 2).length);
    // 3 Failed
    setFailed(currentVariantCodes.filter((el) => el.status == 3).length);
    // 4 Replacement
    setReplaced(currentVariantCodes.filter((el) => el.status == 4).length);
    // 5 Unfulfilled
    setUnfulfilled(currentVariantCodes.filter((el) => el.status == 5).length);
  }, [values["currentVariant"], currentVariantCodes]);

  return (
    <Divider $direction="column">
      {length > 0 ? (
        <Fragment>
          <Heading $margin={{ top: 1, bottom: 1 }} $as="h4">
            Products list
          </Heading>
          <Divider $margin={{ bottom: 2 }}>
            {available > 0 && (
              <Divider
                $options={{
                  additionalStyles: ({ defaults, spaces, colors }) => `
                    padding: ${spaces[1]}rem;
                    margin-right: ${spaces[1]}rem;
                    border-radius: 30px;
                    color ${colors[getColorByStatus(0)]};
                    border: 1px solid ${colors[getColorByStatus(0)]}50;
                    background-color: ${colors[getColorByStatus(0)]}10;`,
                }}
              >
                {available} Available
              </Divider>
            )}

            {sold > 0 && (
              <Divider
                $options={{
                  additionalStyles: ({ defaults, spaces, colors }) => `
                    padding: ${spaces[1]}rem;
                    margin-right: ${spaces[1]}rem;
                    border-radius: 30px;
                    color ${colors[getColorByStatus(1)]};
                    border: 1px solid ${colors[getColorByStatus(1)]}50;
                    background-color: ${colors[getColorByStatus(1)]}10;`,
                }}
              >
                {sold} Sold
              </Divider>
            )}

            {pending > 0 && (
              <Divider
                $options={{
                  additionalStyles: ({ spaces, colors }) => `
                    padding: ${spaces[1]}rem;
                    margin-right: ${spaces[1]}rem;
                    border-radius: 30px;
                    color ${colors[getColorByStatus(2)]};
                    border: 1px solid ${colors[getColorByStatus(2)]}50;
                    background-color: ${colors[getColorByStatus(2)]}10;`,
                }}
              >
                {pending} Pending
              </Divider>
            )}

            {failed > 0 && (
              <Divider
                $options={{
                  additionalStyles: ({ spaces, colors }) => `
                    padding: ${spaces[1]}rem;
                    margin-right: ${spaces[1]}rem;
                    border-radius: 30px;
                    color ${colors[getColorByStatus(3)]};
                    border: 1px solid ${colors[getColorByStatus(3)]}50;
                    background-color: ${colors[getColorByStatus(3)]}10;`,
                }}
              >
                {failed} Failed
              </Divider>
            )}

            {replaced > 0 && (
              <Divider
                $options={{
                  additionalStyles: ({ spaces, colors }) => `
                    padding: ${spaces[1]}rem;
                    margin-right: ${spaces[1]}rem;
                    border-radius: 30px;
                    color ${colors[getColorByStatus(4)]};
                    border: 1px solid ${colors[getColorByStatus(4)]}50;
                    background-color: ${colors[getColorByStatus(4)]}10;`,
                }}
              >
                {replaced} Replaced
              </Divider>
            )}

            {unfulfilled > 0 && (
              <Divider
                $options={{
                  additionalStyles: ({ spaces, colors }) => `
                    border-radius: 30px;
                    padding: ${spaces[1]}rem;
                    margin-right: ${spaces[1]}rem;
                    color ${colors[getColorByStatus(5)]};
                    border: 1px solid ${colors[getColorByStatus(5)]}50;
                    background-color: ${colors[getColorByStatus(5)]}10;`,
                }}
              >
                {unfulfilled} Unfulfilled
              </Divider>
            )}
          </Divider>

          <Divider $direction="column">
            {values !== null && (
              <FieldArray
                name="codes"
                render={(arrayHelpers) =>
                  currentVariantCodes
                    .map((v: ICode, index: number) => (
                      <Code
                        {...v}
                        key={v._id.toString()}
                        index={index}
                        action={() => arrayHelpers.remove(index)}
                      />
                    ))
                    .slice(
                      (pagination - 1) * skip,
                      skip * (pagination - 1) + skip
                    )
                }
              />
            )}

            <Pagination
              $pagination={pagination}
              $length={length}
              $setPagination={setPagination}
              $limit={skip}
              $currentLength={skip}
              $footerMessage={(current, total) =>
                `There are in total ${total} products.`
              }
            />
          </Divider>
        </Fragment>
      ) : (
        <Empty
          style={{ marginBottom: "5em" }}
          heading="No products found!"
          description="Add products to this variant to make it available for purchase."
        />
      )}
    </Divider>
  );
};
