// Global components
import { Label } from "@components";

// Vendors
import styled, { css } from "styled-components";

const Icon = styled.div`
  position: absolute;
  width: 23px;
  height: 23px;
  top: 50%;
  transform: translateY(-50%);
  ${({ theme: { spaces } }) => css`
    left: ${spaces[1]}rem;
  `}
`;

const Component = styled.div<{ selected?: boolean }>`
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;

  ${({ theme: { defaults, spaces } }) => css`
    border-radius: ${defaults["radius"]}px;
    padding: ${(spaces[2] as number) / 1.5}rem ${spaces[2]}rem;
    padding-left: calc(${spaces[2]}rem + 23px);
  `}

  border: ${({ selected, theme: { colors } }) =>
    selected === true
      ? `1px solid ${colors["secondary"]}`
      : `1px solid ${colors["border"]}`};

  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.p`
  color: #555;
  margin-left: 0.5em;
`;

// Global icons
import { SuccessIcon, ErrorIcon } from "@icons";

export const Checkbox = ({
  text,
  selected,
  setSelected,
  label,
  ...props
}: any) => {
  return (
    <section style={{ width: "100%" }}>
      <Label>{label}</Label>
      <Component
        onClick={setSelected}
        style={{ width: "100%" }}
        selected={selected}
        {...props}
      >
        <Icon>
          {selected === true ? (
            <SuccessIcon $size={23} />
          ) : (
            <ErrorIcon $size={23} />
          )}
        </Icon>

        {text}
      </Component>
    </section>
  );
};
