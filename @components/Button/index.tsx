// Core
import { type FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Global types
import { IIcon } from "@types";

// Global components
import { Icon } from "@components";

// Global styles
import { Icon as IconStyle } from "@styles";

interface Shared {
  $variant: "primary" | "secondary" | "danger";
  $style?: "outline" | "solid";
  $isDisabled?: boolean;
  icon?: IIcon;
}

interface Style extends Shared {}

interface Props extends Shared, React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Component = styled.button<Style>`
  border: 0;
  background: transparent;
  user-select: none;
  cursor: pointer;
  outline: none;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ theme: { defaults, spaces } }) => css`
    border-radius: ${defaults["radius"] * 10}px;
    padding: ${(spaces[1] as number) * 2}rem;
    border: 1px solid transparent;
  `}

  ${({ icon, theme: { spaces } }) =>
    Boolean(icon) &&
    `
      ${IconStyle} {
        margin-right: ${spaces[1]}rem;
      }
    `}

  ${({ $variant, $style = "solid", type, theme: { colors } }) => {
    switch ($style) {
      case "outline":
        switch ($variant) {
          case "primary":
            return css`
              background-color: transparent;
              border-color: ${colors["primary"]};
              color: ${colors["primary"]};
            `;
        }
      default:
        switch ($variant) {
          case "primary":
            return css`
              background-color: ${colors["primary"]};
              color: ${colors["white"]};
            `;
          case "danger":
            return css`
              background-color: ${colors["danger"]};
              color: ${colors["white"]};
            `;

          case "secondary":
            return css`
              background-color: ${colors["secondary"]};
              color: ${colors["white"]};
            `;

          default:
            return css`
              width: 100%;
              border: 1px solid ${colors.primary};
              color: ${colors.primary};

              p {
                font-size: 0.9em;
                margin-left: 0.5em;
              }

              &:not([disabled]) {
                &:hover {
                  opacity: 0.9;
                  cursor: pointer;
                }
              }
            `;
        }
    }
  }}

  ${({ $isDisabled }) =>
    $isDisabled
      ? `
    opacity: 0.5;
    cursor: not-allowed;
    `
      : `  
      &[disabled] {
        opacity: 0.25;
        cursor: not-allowed;
      }

      &:hover:not(&[disabled]) {
        opacity: 0.9;
      }

      &:active:not(&[disabled]) {
        border-color: initial;
        transform: scale(0.935);
      }
    `}
`;

export const Button: FC<Props> = ({
  icon,
  $style,
  $variant,
  $isDisabled,
  children,
  ...props
}) => {
  return (
    <Component {...{ $style, $variant, $isDisabled, icon }} {...props}>
      {/* If icon is found, show it */}
      {icon && <Icon {...icon} />}

      {children}
    </Component>
  );
};
