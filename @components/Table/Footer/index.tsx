// Core Types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

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

const PageNumbers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  ${({ theme: { defaults, colors, font } }) => css`
    padding-left: ${defaults.gutter / 2}px;
    padding-right: ${defaults.gutter / 2}px;
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

interface Footer<T> {
  setPagination: (p: number) => void;
  footerMessage: (a: number, b: number, c: boolean) => React.ReactNode;
  pagination: number;
  limit: number;
  length: number;
  updatedItems: T[];
  isLoading: boolean;
}

const index = <T,>({
  setPagination,
  footerMessage,
  isLoading,
  pagination,
  updatedItems,
  limit,
  length,
}: Footer<T>) => {
  return (
    <Footer>
      <Current>
        {footerMessage(updatedItems?.length, length, isLoading)}
      </Current>

      <Navigation>
        <Button
          disabled={!Boolean(pagination !== 0)}
          onClick={() => {
            // Change pagination index
            setPagination(pagination - 1);
          }}
          isHidden={!Boolean(pagination !== 0)}
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

        <PageNumbers>
          {Array.from(
            Array(length ? Math.ceil(Number(length) / Number(limit)) : 0).keys()
          ).map((el) => (
            <PageNumber
              isActive={el === pagination}
              key={el}
              onClick={() => setPagination(el)}
            >
              {el + 1}
            </PageNumber>
          ))}
        </PageNumbers>

        <Button
          disabled={
            !Boolean(
              length > limit &&
                !Boolean(length < (pagination + 1) * Number(limit))
            )
          }
          onClick={() => {
            // Change pagination index
            setPagination(pagination + 1);
          }}
          isHidden={
            !Boolean(
              length > limit &&
                !Boolean(length < (pagination + 1) * Number(limit))
            )
          }
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
      </Navigation>
    </Footer>
  );
};

export { index as Footer };
