import { IResponse, ISuccessfulResponse } from "@types";

// Response Function parameters interface
type IResponseParams<T> =
  | {
      status: "success";
      model: string;
      message?: string;
      data: {
        items: T[];
        length: number;
      };
    }
  | { status: "error" | "unauthorized"; model: string; message?: string };

// Response Function returning exact data based on status type
export const getResponse = <T>({
  status,
  model,
  message,
  ...props
}: IResponseParams<T>): IResponse<T> => {
  switch (status) {
    case "error":
      return {
        status,
        code: 500,
        message: message ? message : "Something went wrong.",
      };
    case "unauthorized":
      return {
        status,
        code: 401,
        message: message ? message : "Access denied.",
      };
    case "success":
      return {
        status,
        code: 200,
        message: message ? message : `${model}(s) successfully fetched.`,
        ...props,
      } as ISuccessfulResponse<T>;
  }
};
