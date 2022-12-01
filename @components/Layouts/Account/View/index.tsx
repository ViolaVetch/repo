// Vendors
import styled from "styled-components";

// Global components
import { Divider, Heading } from "@components";

const Screen = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
`;

const View: any = ({
  title,
  $padding,
  ...props
}: {
  $padding: boolean;
  [x: string]: any;
}): any => {
  return (
    <Divider
      $extends="card"
      $direction="column"
      $options={{
        flex: 1,
        additionalStyles: () =>
          $padding === false ? "padding: 0 !important;" : "",
      }}
    >
      {props.children}
    </Divider>
  );
};

export default View;
