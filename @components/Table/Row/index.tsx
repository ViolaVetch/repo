// Core
import { Fragment, createElement } from "react";

// Core types
import type { FC, MouseEventHandler } from "react";

// Vendors
import styled, { css } from "styled-components";

// Global types
import { ThemeBreakpoints } from "@types";

// Global utilities, @client-only
import { getStyle } from "@utils/client/styles";

// Global types
import {
  Column as ColumnType,
  ColumnSize as ColumnSizeType,
  RowTypes as RowTypesType,
} from "@types";

interface IRowStyle {
  $type?: RowTypesType;
  $width?: ThemeBreakpoints<number> | number;
}

const Row = styled.div<IRowStyle>`
  display: flex;
  align-items: center;

  ${({ theme: { defaults, colors, breakpoints } }) => css`
    border-bottom: 1px solid ${colors.border};
    padding-left: ${defaults.gutter}px;
    padding-right: ${defaults.gutter}px;
  `}

  ${({ $width, theme }) => {
    return $width
      ? getStyle({
          style: $width,
          theme,
          callback: (value) => `min-width: ${value}px;`,
        })
      : css`
          @media (min-width: ${theme["breakpoints"]["md"]}px) {
            min-width: 650px;
          }

          @media (max-width: ${theme["breakpoints"]["md"]}px) {
            min-width: 600px;
          }
        `;
  }}

  ${({ $type, theme: { defaults, colors, font } }) => {
    switch ($type) {
      case "body":
        return css`
          cursor: pointer;
          padding-top: ${defaults.gutter / 5}px;
          padding-bottom: ${defaults.gutter / 5}px;

          &:hover {
            background-color: ${colors.link};
          }

          &:active {
            background-color: ${colors.active};
          }
        `;
      default:
        return `
            padding-top: ${defaults.gutter / 2}px;
            padding-bottom: ${defaults.gutter / 2}px;
        `;
    }
  }}
`;

const Column = styled.div<{ $type?: RowTypesType }>`
  display: flex;
  word-break: break-all;

  &:last-of-type {
    justify-content: flex-end;
  }

  ${({ theme: { defaults, spaces, breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      min-width: 100px;
      padding-right: ${defaults.gutter / 2}px;
    }
  `}

  ${({ $type, theme: { font, spaces } }) => {
    switch ($type) {
      case "head":
        return css`
          font-weight: ${font.weight.semiBold};
        `;
      default:
        return css`
          padding-top: ${spaces[2]}rem;
          padding-bottom: ${spaces[2]}rem;
          font-weight: ${font["weight"]["medium"]};
        `;
    }
  }}
`;

const Smallest = styled(Column)`
  flex: 0 0 60px;
`;

const Small = styled(Column)`
  flex: 0.5;
`;

const Medium = styled(Column)`
  flex: 0.75;
`;

const getColumnBySize = (size: ColumnSizeType) => {
  switch (size) {
    case "smallest":
      return Smallest;
    case "small":
      return Small;
    default:
      return Medium;
  }
};

const CustomColumn = ({ $type, size, value, ...props }: ColumnType) =>
  // Return the passed Component from props
  createElement(getColumnBySize(size), {
    onClick: () => {},
    ...props,
    $type,
    children: value ? value : props.children,
  });

interface Row extends IRowStyle {
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  columns: ColumnType[];
}

const index: FC<Row> = ({ columns, onClick, $type = "body", $width }) => {
  return (
    <Row onClick={onClick} {...{ $width, $type }}>
      {Array.isArray(columns)
        ? columns.map((column, i) => (
            <CustomColumn
              key={Number(new Date()) + i}
              {...{ $type, ...column }}
            />
          ))
        : ""}
    </Row>
  );
};

export { index as Row };
