// Vendors
import styled from "styled-components";

const Component = styled.section`
  width: 100%;
  height: 93vh;
  background: #5a41dc;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  padding-bottom: 7.5%;

  h1 {
    font-size: 2.5em;
    color: #fff;
    z-index: 2;
  }

  p {
    width: 40%;
    text-align: center;
    font-size: 1.15em;
    margin: 0.5em 0em 1em 0em;
    color: #fff;
    z-index: 2;
  }

  span {
    color: #5a41dc;
    margin-left: 0.5em;
    font-size: 1em;
  }
`;

export const Error = ({ children, ...props }: any) => {
  return <Component {...props}>{children}</Component>;
};
