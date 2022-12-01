// Core
import { ChangeEvent, type FC, useState, useMemo, useEffect } from "react";

// Vendors
import styled, { css } from "styled-components";

// Local styled components
const Label = styled.label``;

const Number = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Fieldcontainer = styled.div`
  position: relative;
  display: flex;
`;

const Field = styled.input`
  flex: 1;

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }

  ${({ theme: { defaults, colors, spaces } }) => css`
    border: 1px solid ${colors["border"]};
    padding: ${(spaces[2] as number) / 1.5}rem ${spaces[2]}rem;
    padding-left: calc(${spaces[2]}rem + 23px);
    border-radius: ${defaults["radius"]}px;
  `}
`;

const Button = styled.button`
  width: 23px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: transform 200ms ease-in-out;
  cursor: pointer;

  ${({ theme: { colors } }) => css`
    background-color: ${colors["secondary"]};

    svg {
      fill: ${colors["white"]};
    }

    &:active {
      transform: translateY(-50%) scale(0.95);
    }
  `}
`;

const Increase = styled(Button)`
  ${({ theme: { spaces } }) => `
    right: ${spaces[1]}rem;
  `}
`;

const Decrease = styled(Button)`
  ${({ theme: { spaces } }) => `
    left: ${spaces[1]}rem;
  `}
`;

interface Number {
  $min: number;
  $max: number;
  $value?: number;
  $label: string;
  onUpdate: (value: number | undefined) => void;
}

const index: FC<Number> = ({ $min, $max, $value, $label, onUpdate }) => {
  const [currentValue, setCurrentValue] = useState<number | undefined>($value);
  const currentValueMemo = useMemo(() => currentValue, [currentValue]);

  // Handle Decrease button click
  const handleDecrease = () => {
    if (currentValueMemo === undefined) setCurrentValue(0);
    else if (currentValueMemo === $min) return;
    else setCurrentValue(currentValueMemo - 1);
  };

  // Handle Increase button click
  const handleIncrease = () => {
    if (currentValueMemo === undefined) setCurrentValue(1);
    else if (currentValueMemo === $max) return;
    else setCurrentValue(currentValueMemo + 1);
  };

  // Handle direct changes
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    // Remove all characters and leave only numbers
    const num = parseInt(target.value.replace(/[^\d.]/g, ""));

    // Apply new number from input
    // TBC: Apply quantity max somehow for number type
    if (num > $max) setCurrentValue($max);
    else if (num < $min) setCurrentValue($min);
    else setCurrentValue(num ? num : 0);
  };

  // Listen to currentvalue changes
  useEffect(() => {
    onUpdate(currentValueMemo);
  }, [currentValueMemo]);

  return (
    <Number>
      <Label>{$label}</Label>
      <Fieldcontainer>
        <Decrease type="button" onClick={handleDecrease}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 23 23"
          >
            <rect
              id="Rectangle_28"
              data-name="Rectangle 28"
              width="23"
              height="23"
              fill="none"
            />
            <path
              id="Path_102"
              data-name="Path 102"
              d="M7.233,1.721A1.006,1.006,0,1,0,5.81.3C3.07,2.925,2.378,3.765.3,5.8A1.008,1.008,0,1,0,1.725,7.226"
              transform="translate(11.497 6.179) rotate(45)"
            />
          </svg>
        </Decrease>
        <Field
          value={currentValueMemo}
          type="number"
          onChange={handleOnChange}
        />
        <Increase type="button" onClick={handleIncrease}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 23 23"
          >
            <rect
              id="Rectangle_27"
              data-name="Rectangle 27"
              width="23"
              height="23"
              fill="none"
            />
            <path
              id="Path_101"
              data-name="Path 101"
              d="M7.234,5.806,5.188,3.761l2.045-2.04A1.006,1.006,0,1,0,5.81.3L3.764,2.342,1.719.295A1.007,1.007,0,1,0,.295,1.719L2.342,3.766.3,5.8A1.008,1.008,0,1,0,1.725,7.226L3.768,5.184,5.815,7.229A1.006,1.006,0,1,0,7.237,5.806"
              transform="translate(11.497 6.179) rotate(45)"
            />
          </svg>
        </Increase>
      </Fieldcontainer>
    </Number>
  );
};

export { index as Number };
