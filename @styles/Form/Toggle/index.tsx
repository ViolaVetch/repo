// Vendors
import styled, { css } from "styled-components";

export const Toggle = styled.div<{
  $size?: "small" | "normal";
  checked?: boolean;
}>`
  position: relative;

  ${({ $size }) => {
    switch ($size) {
      case "small":
        return css`
          width: 20px;
          min-width: 20px;
          height: 15px;

          &:before {
            width: 8px;
            height: 8px;
            top: 2.5px;
            border-width: 1px;
          }

          &:after {
            height: 1.5px;
            border-width: 1px;
          }
        `;

      default:
        return css`
          width: 30px;
          min-width: 30px;
          height: 22px;

          &:before {
            width: 12px;
            height: 12px;
            top: 4.5px;
            border-width: 1.5px;
          }

          &:after {
            height: 2px;
            border-width: 1.5px;
          }
        `;
    }
  }}

  ${({
    checked,
    theme: {
      defaults,
      colors,
      font: { size, family },
    },
  }) => css`
    border-radius: 6px;
    font-size: ${size}px;
    font-family: ${family};

    &:before {
      border-radius: 50%;
      left: 4px;

      ${({ theme: { colors } }) => css`
        background-color: ${colors["primary"]};
      `}

      content: "";
      position: absolute;
      transition: all 100ms ease-in-out;
      z-index: 2;
      border-style: solid;
      border-color: ${colors["primary"]};
    }

    &:after {
      width: calc(100% - 3px);
      top: calc(50% - 1.5px);
      z-index: 1;
      right: 0;
      border-radius: 3px;

      ${({ theme: { colors } }) => css`
        background-color: ${colors["primary"]}30;
      `}

      content: "";
      position: absolute;
      transition: all 200ms ease-in-out;
      border-style: solid;
      border-color: ${colors["primary"]};
    }

    ${checked
      ? `
        &:before {
          left: 15px;
          background-color: ${colors["primary"]};
        }

        &:after {
          background-color: ${colors["primary"]};
        }
      `
      : ``}
  `}
`;
