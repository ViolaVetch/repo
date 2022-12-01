// Vendors
import styled, { css } from "styled-components";

interface Field {
  hasError?: boolean;
  hasIcon?: boolean;
  info?: boolean;
  type?: string;
  $variant?: "static";
}

export const Field = styled.input<Field>`
  outline: 0;
  background-color: transparent;
  -webkit-appearance: none;
  flex: 1 1 auto;

  &[type="select"] {
    margin-right: 10px;
  }

  &[type="checkbox"] {
    width: 24px;
    height: 24px;
    flex: 0 0 24px;
    margin-right: 10px;
    padding: 0;
    border-width: 1.5px;
  }

  ${({ theme: { colors, defaults, name }, hasError, hasIcon, info }) => {
    return css`
      border-radius: ${defaults["radius"]}px;
      border: 1px solid ${colors["border"]};
      color: ${colors["secondary"]};
      padding: ${defaults.gutter / 1.9 - 1}px ${defaults.gutter / 1.75 - 1}px
        ${defaults.gutter / 1.6 - 1}px ${defaults.gutter / 1.75 - 1}px;

      &:focus {
        border-color: ${colors["primary"]};
      }

      &[type="checkbox"] {
        &:checked {
          background-image: ${name === "light"
            ? 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjMuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA5LjMgNy40IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA5LjMgNy40OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzFBMTgxODt9Cjwvc3R5bGU+CjxnIGlkPSJQYXRoXzMxMzUiPgoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI4LjksMS41IDMuNyw2LjggMC4zLDMuNSAxLjIsMi42IDMuNyw1IDgsMC42IAkiLz4KPC9nPgo8L3N2Zz4K")'
            : 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjMuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA5LjMgNy40IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA5LjMgNy40OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxnIGlkPSJQYXRoXzMxMzUiPgoJPHBvbHlnb24gY2xhc3M9InN0MCIgcG9pbnRzPSI4LjksMS41IDMuNyw2LjggMC4zLDMuNSAxLjIsMi42IDMuNyw1IDgsMC42IAkiLz4KPC9nPgo8L3N2Zz4K")'};
          background-size: 13px;
          background-repeat: no-repeat;
          background-position: center;
        }
      }

      &[disabled] {
        background-color: ${colors.border};
      }

      ::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: ${colors["secondary"]}50;
        opacity: 1; /* Firefox */
      }

      :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: ${colors["secondary"]}50;
      }

      ::-ms-input-placeholder {
        /* Microsoft Edge */
        color: ${colors["secondary"]}50;
      }

      ${hasError &&
      `
        padding-right: ${info ? "75px" : "40px"};
        border-color: ${colors.danger} !important; 
      `}

      ${hasIcon &&
      `
        padding-left: ${defaults.gutter * 2}px;
      `}
    `;
  }}
`;
