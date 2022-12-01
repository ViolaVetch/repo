// Local components
import { Label } from "@components";

// Vendors
import styled, { css } from "styled-components";

const Component = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;
`;

const TextArea = styled.textarea`
  width: 100%;
  font-size: 1.05em;
  padding: 0.6em;
  border: 0;
  background: transparent;
  transition: 200ms all ease-in-out;
  border-radius: 0.7em;
  border: 1px solid #eaeef2;
  // margin-top: 1em;
  resize: none;
  height: 100%;

  ${({ theme: { colors } }) => css`
    &:focus {
      border: 1px solid ${colors.primary};
    }
  `}
`;

export const Textareaium = ({
  label,
  placeholder,
  value,
  disabled,
  changeValue,
  ...props
}: any) => {
  return (
    <Component {...props}>
      <Label>{label}</Label>

      <TextArea
        onChange={changeValue}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
    </Component>
  );
};
