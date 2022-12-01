// Vendors
import styled, { css } from "styled-components";

// Triangle from popup
export const Triangle = styled.div<{ $size?: 1 | 2 | 3 }>`
  position: absolute;
  text-align: left;
  background-color: white;
  z-index: 1;

  ${({ $size }) => {
    switch ($size) {
      case 1:
        return css`
          width: 10px;
          height: 10px;
          right: calc(50% - 5px);
          top: -2.5px;
          border-top-right-radius: 3px;

          &:before,
          &:after {
            border-top-right-radius: 3px;
            width: 10px;
            height: 10px;
          }
        `;
      case 2:
        return css`
          width: 15px;
          height: 15px;
          right: calc(50% - 7.5px);
          top: -10px;
          border-top-right-radius: 6px;

          &:before,
          &:after {
            border-top-right-radius: 6px;
            width: 15px;
            height: 15px;
          }
        `;
      default:
        return css`
          width: 20px;
          height: 20px;
          right: calc(50% - 10px);
          top: -15px;
          border-top-right-radius: 9px;

          &:before,
          &:after {
            border-top-right-radius: 9px;
            width: 20px;
            height: 20px;
          }
        `;
    }
  }}

  transform: rotate(-60deg) skewX(-30deg) scale(1, 0.866);

  &:before,
  &:after {
    content: "";
    position: absolute;
    background-color: inherit;
  }

  &:before {
    transform: rotate(-135deg) skewX(-45deg) scale(1.414, 0.707)
      translate(0, -50%);
  }

  &:after {
    transform: rotate(135deg) skewY(-45deg) scale(0.707, 1.414) translate(50%);
  }
`;
