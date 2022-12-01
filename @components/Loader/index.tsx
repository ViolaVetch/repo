// Vendors
import styled, { css } from "styled-components";

// Global types
import { ThemeColors } from "@types";

const Spinner = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

  &:nth-child(1) {
    animation-delay: -0.45s;
  }
  &:nth-child(2) {
    animation-delay: -0.3s;
  }
  &:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Container = styled.div<{ $size?: number; $color?: ThemeColors }>`
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  position: relative;

  ${({ $size = 25, $color = "primary", theme: { colors } }) => css`
    width: ${$size}px;
    height: ${$size}px;

    ${Spinner} {
      width: ${$size}px;
      height: ${$size}px;
      border: ${$size / 7.5}px solid ${colors[$color]};
      border-color: ${colors[$color]} transparent transparent transparent;
    }
  `}
`;
export const Loader = ({
  $type,
  ...props
}: {
  $color?: ThemeColors;
  $size?: number;
  $type?: "standard" | "normal" | "full";
}) => {
  switch ($type) {
    default:
      return (
        <Container {...props}>
          <Spinner />
          <Spinner />
          <Spinner />
          <Spinner />
        </Container>
      );
  }
};
