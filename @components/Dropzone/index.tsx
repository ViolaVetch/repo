// Core
import React from "react";

// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";
import { useDropzone } from "react-dropzone";
import { Divider } from "@components/Divider";

// Current UI
import { ThumbnailIcon } from "@icons";
import SiteConfig from "configs/Site.config";

// Styles
const Helper = styled.div`
  ${({ theme: { defaults, font, colors } }) => css`
    font-weight: ${font.weight.medium};
    margin-top: ${defaults.gutter / 3}px;
    font-size: 10px;
    line-height: 14px;
  `}
`;

const Label = styled.div`
  ${({ theme: { defaults } }) => css`
    margin-bottom: ${defaults.gutter / 2}px;
  `}
`;

const Dropzone = styled.div<{ error?: boolean; active?: boolean }>`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  flex: 0 0 50%;

  ${({ error, active, theme: { defaults, spaces, colors } }) => css`
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23B9C2C8FF' stroke-width='2' stroke-dasharray='4%2c 9' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    color: ${colors.secondary};
    padding: ${defaults.gutter}px;
    border-radius: ${defaults.radius}px;

    ${active &&
    `
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23208DD0FF' stroke-width='2' stroke-dasharray='4%2c 9' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    `}

    ${error &&
    `
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23D02020FF' stroke-width='2' stroke-dasharray='4%2c 9' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    `}

    &:hover {
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23208DD0FF' stroke-width='2' stroke-dasharray='4%2c 9' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
      cursor: pointer;
    }
  `}

  input {
    &:active {
      border-color: red;
      outline: 0;
    }
  }
`;

const Current = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  ${({ theme: { defaults, colors, spaces, ...theme } }) => css`
    border: 1px solid ${colors.border};
    background-color: ${colors.border};
    border-radius: ${defaults.radius}px;
  `}
`;

const CurrentContainer = styled.div`
  flex: 0 0 50%;
  display: flex;
  ${({ theme: { defaults, colors, spaces, ...theme } }) => css`
    padding-left: ${spaces[2]}rem;
  `}
`;

const Image = styled.img`
  flex: 1;
  width: 100%;
  max-width: 320px;

  ${({ theme: { defaults, colors, font, ...theme } }) => css``}
`;

const Button = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: underline;

  ${({ theme: { font } }) =>
    css`
      font-weight: ${font.weight.semiBold};
    `}
`;

const DropzoneContainer: FC<{
  helper?: any;
  selectLabel?: string;
  label: string | string[];
  onSuccess: Function;
  onError: Function;
  accept?: string;
  current?: string;
  hasError?: boolean;
  description: string | string[];
}> = ({
  hasError,
  helper,
  label,
  selectLabel,
  description,
  onSuccess,
  onError,
  current,
}) => {
  // Dropzone callback
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // Note how this callback is never invoked if drop occurs on the inner dropzone
    onDrop: async (files) => {
      {
        const [file] = files;
        const bodyFormData = new FormData();
        const fileName = `/images/${Date.now()}-${file.name}`;

        (bodyFormData as any).append("upload", file, fileName);

        if (file.size > 500000) {
          onError("File size exceeds limit");
        } else {
          if (
            file.type === "image/png" ||
            file.type === "image/jpg" ||
            file.type === "image/jpeg" ||
            file.type === "image/svg+xml"
          ) {
            // If file size is less than 500kb and the type is either PNG or SVG
            // Send file to Digitalocean spaces

            const url = `${SiteConfig.API}/upload`;
            // Handle request data
            const requestOptions: any = {
              method: "POST",
              // headers: { "Content-Type": "application/json" },
              body: bodyFormData,
            };

            try {
              // Send product on the server
              const response = await fetch(url, requestOptions);
              const [file] = await response.json();

              const { location } = file;

              // Assign logo url
              onSuccess(location);
            } catch (error) {
              onError(error);
            }
          } else {
            onError("File type is not allowed");
          }
        }
      }
    },
    multiple: false,
  });

  return (
    <>
      <Divider $margin={{ bottom: 2 }} $direction="column">
        <Label>{label}</Label>

        <Divider
          $options={{
            additionalStyles: () => `
              width: 100%;
            `,
          }}
        >
          <Dropzone
            active={isDragActive ? true : false}
            error={hasError}
            {...getRootProps({ className: "dropzone" })}
          >
            {/* Upload icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25.566"
              height="20.144"
              viewBox="0 0 25.566 20.144"
            >
              <path
                d="M18.592,4.116A7.063,7.063,0,0,0,5.275,5.545,5.61,5.61,0,1,0,6.508,16.682L6.17,14.537a3.442,3.442,0,0,1-3.994-3.393,3.47,3.47,0,0,1,3.9-3.4l1.149.145L7.3,6.731a4.889,4.889,0,0,1,9.559-1.078l.3,1.01,1.02-.27a4.267,4.267,0,0,1,1.061-.135,4.161,4.161,0,0,1,0,8.323v2.173a6.34,6.34,0,0,0,6.332-6.336,6.411,6.411,0,0,0-6.974-6.3"
                transform="translate(0)"
                fill="#032638"
              />
              <path
                d="M2.422,7.057,3.96,8.595,5.933,6.622v7.7H8.106V6.6l1.973,1.973,1.537-1.537L7.031,2.448Z"
                transform="translate(5.763 5.825)"
                fill="#032638"
              />
            </svg>

            <input {...getInputProps()} />

            {isDragActive ? (
              `Here! Drop it.`
            ) : (
              <div style={{ marginTop: 10 }}>
                {description} <Button>{selectLabel}</Button>
              </div>
            )}
          </Dropzone>

          <CurrentContainer>
            <Current>
              {current ? (
                <Image src={current} />
              ) : (
                <Divider $color="grey" $direction="column" $alignItems="center">
                  <ThumbnailIcon mode="full" color="#ABABAB" size="2em" />
                  No image found
                </Divider>
              )}
            </Current>
          </CurrentContainer>
        </Divider>

        <Helper>{helper}</Helper>
      </Divider>
    </>
  );
};

export { DropzoneContainer as Dropzone };
