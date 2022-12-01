// Global components
import { Input, Label } from "@components";

// Vendors
import styled, { css } from "styled-components";

const Component = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${({ theme: { defaults, spaces } }) => css`
    margin-bottom: ${spaces[2]}rem;
  `}
`;

export const Labelium = ({
  label,
  placeholder,
  value,
  disabled,
  changeValue,
  ...props
}: any) => {
  return (
    <Component>
      <Label>{label}</Label>

      <Input
        type={props.type || "text"}
        onChange={changeValue}
        defaultValue={value}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />
    </Component>
  );
};
