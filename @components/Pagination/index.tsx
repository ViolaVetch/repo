// Core Types
import { type FC, Fragment } from "react";

// Vendors
import styled, { css } from "styled-components";

// Local hook
import { usePagination } from "./usePagination";

const Footer = styled.div`
  display: flex;

  ${({ theme: { colors, defaults, breakpoints } }) => css`
    color: ${colors["grey"]};

    @media (min-width: ${breakpoints.md + 1}px) {
      padding: ${defaults.gutter}px ${defaults.gutter}px
        ${defaults.gutter / 2}px ${defaults.gutter}px;
    }

    @media (max-width: ${breakpoints.md}px) {
      padding-top: ${defaults.gutter}px;
      flex-direction: column;
    }
  `}
`;

const Navigation = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme: { defaults, breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      width: 100%;
      margin-top: ${defaults.gutter / 2}px;
    }
  `}
`;

const Button = styled.button<{ isHidden?: boolean }>`
  cursor: pointer;

  ${({ theme: { defaults, colors, font } }) => css`
    padding: ${defaults.gutter / 4}px ${defaults.gutter / 2}px;
    font-weight: ${font.weight.semiBold};
    border: 0;

    &[disabled] {
      opacity: 0.25;
    }

    &:hover {
      background-color: ${colors.link};
    }

    &:active {
      background-color: ${colors.active};
    }
  `}
`;

const PageNumber = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ isActive, theme: { defaults, colors } }) => css`
    padding: ${defaults.gutter / 4}px ${defaults.gutter / 2}px;

    ${!isActive &&
    `
      opacity: 0.5;
    `}

    &:hover {
      background-color: ${colors.link};
    }

    &:active {
      background-color: ${colors.active};
    }
  `}
`;

const Current = styled.div`
  font-size: 12px;

  ${({ theme: { defaults, font, breakpoints } }) => css`
    font-weight: ${font["weight"]["medium"]};
    @media (max-width: ${breakpoints.md}px) {
      padding-left: ${defaults.gutter / 2}px;
    }
  `}
`;

interface Shared {
  $setPagination: (a: number) => void;
  $limit: number;
  $length: number;
  $pagination: number;
}

interface Footer extends Shared {
  /** Display a message showing current amount of items visible versus the total amount */
  $footerMessage: (a: number, b: number) => string;
  $currentLength: number;
}

interface IPagination {
  $setPagination: (e: number) => void;
  $length: number;
  $pagination: number;
  $limit: number;
}

const Numbers = ({
  $setPagination,
  $length,
  $pagination,
  $limit,
}: IPagination) => {
  // Grab the current pagination range
  const { range, DOTS } = usePagination({
    $pagination,
    $length,
    $limit,
  });

  return (
    <Fragment>
      <Button
        type="button"
        disabled={!Boolean($pagination !== 1)}
        onClick={() => $setPagination($pagination - 1)}
        isHidden={!Boolean($pagination !== 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8.093"
          height="8.016"
          viewBox="0 0 8.093 8.016"
        >
          <path
            d="M4.083,0l-.73.732,2.76,2.76H0V4.526H6.113l-2.76,2.76.73.73,4.01-4.008Z"
            transform="translate(8.093 8.016) rotate(180)"
            fill="#032638"
          />
        </svg>
        &nbsp; Previous
      </Button>

      {range.map((pageNumber: string | number, index: number) => {
        if (pageNumber === DOTS) {
          return <div key={`${pageNumber}${index}`}>&#8230;</div>;
        }

        return (
          <PageNumber
            isActive={pageNumber === $pagination}
            key={(pageNumber as number) + index}
            onClick={() => $setPagination(pageNumber as number)}
          >
            {pageNumber}
          </PageNumber>
        );
      })}

      <Button
        type="button"
        disabled={
          !Boolean(
            $length > $limit &&
              !Boolean($length <= $pagination * Number($limit))
          )
        }
        onClick={() => $setPagination($pagination + 1)}
        style={{ marginLeft: "auto" }}
      >
        Next &nbsp;
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8.093"
          height="8.016"
          viewBox="0 0 8.093 8.016"
        >
          <path
            d="M4.083,0l-.73.732,2.76,2.76H0V4.526H6.113l-2.76,2.76.73.73,4.01-4.008Z"
            transform="translate(0 0)"
            fill="#032638"
          />
        </svg>
      </Button>
    </Fragment>
  );
};

const index: FC<Footer> = ({
  $setPagination,
  $footerMessage,
  $pagination,
  $currentLength,
  $limit,
  $length,
}) => {
  return (
    <Footer>
      <Current>{$footerMessage($currentLength, $length)}</Current>

      <Navigation>
        {/* Page numbers */}

        <Numbers
          {...{
            $setPagination,
            $length,
            $pagination,
            $limit,
          }}
        />
      </Navigation>
    </Footer>
  );
};

export { index as Pagination };
