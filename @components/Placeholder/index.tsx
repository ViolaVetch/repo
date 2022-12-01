// Vendors
import styled from "styled-components";

const Component = styled.section<{ isUploadable: boolean }>`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  ${(props) =>
    props.isUploadable &&
    `
            &:hover{
            transition: all ease-in-out .3s;
            cursor: pointer;
        `}
`;

const Text = styled.p<{ font: any }>`
  color: #ababab;
  margin-top: 0.15em;
  font-size: ${(props: any): any => props.font};
  text-align: center;
`;

const Remover = styled.section`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  display: flex;
  padding: 0.25em 0.5em;
  border: 1px solid #ababab;
  border-radius: 1em;

  &:hover {
    transition: all ease-in-out 0.3s;
    border: 1px dotted #ababab;
    cursor: pointer;

    opacity: 0.9;
  }
`;

const Icongraph = styled.p`
  font-size: 0.9em;
  margin-left: 0.5em;
  text-transform: Capitalize;
  color: #555;
`;

import { ThumbnailIcon, DeleteIcon } from "@icons";

export const Placeholder = ({ text, icon, what, font, ...props }: any) => {
  return (
    <Component isUploadable={props.isUploadable} {...props}>
      <ThumbnailIcon mode={props.mode} color="#ABABAB" size="2em" />

      {props.isUploadable && (
        <>
          <Remover>
            <DeleteIcon />
            <Icongraph>Remove {what}</Icongraph>
          </Remover>

          <Text font={font}>
            No {what} was found, <br />
            what about adding it?
          </Text>
        </>
      )}

      {!props.isUploadable && (
        <Text font={font}>
          This Product <br />
          has no Thumbnail.
        </Text>
      )}
    </Component>
  );
};
