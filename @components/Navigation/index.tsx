// Vendors
import styled from "styled-components";

const Component = styled.section`
  width: 100%;
  height: auto;
  padding: 0.6em 0.75em;
  margin-bottom: 0.5em;
  display: flex;
  align-items: center;
  border-radius: 0.5em;

  &:hover {
    transition: all ease-in-out 0.3s;
    background: #5a41dc15;
    cursor: pointer;
  }
`;

// Core
import Link from "next/link";

export const Navigation = ({ children, link = "", ...props }: any) => {
  return (
    <Link href={link}>
      <Component {...props}>{children}</Component>
    </Link>
  );
};
