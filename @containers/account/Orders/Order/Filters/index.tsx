// Core
import { useRouter } from "next/router";

import { DeleteIcon, ArrowIcon } from "@icons";
import { showConfirmation } from "redux/confirmationSlice";
import { useDispatch } from "react-redux";
import { Button, Linebreak, Icon, Separator, Divider } from "@components";
import styled from "styled-components";
import { deleteItems } from "@methods/deleteItems";
import mongoose from "mongoose";
import { useSession } from "next-auth/react";
import { Fragment } from "react";

export const Filters = ({
  setLoading,
  $path,
}: {
  setLoading: (a: boolean) => void;
  $path?: string;
}) => {
  const { data: session } = useSession();

  // Handle confirmation dispatch
  const dispatch = useDispatch();

  // Route management
  const { push, query } = useRouter();
  const { id } = query;

  const handleDelete = () => {
    dispatch(
      showConfirmation({
        title: "Order Deletion",
        message: "Are you sure you want to delete this product?",
        action: () => {
          deleteItems({
            model: "orders",
            target: new mongoose.Types.ObjectId(id as string),
            onSuccess: () => push("/account/orders"),
            setLoading,
            dispatch,
          });
        },
      })
    );
  };

  return (
    <Fragment>
      <Button
        $variant="primary"
        $style="outline"
        type="button"
        onClick={() => push(`/account/orders`)}
        icon={{
          $icon: "arrow-left",
          $size: 20,
        }}
      >
        Back
      </Button>
      {session?.user.role === "admin" && (
        <Fragment>
          <Separator $axis={{ xs: "x", sm: "x", md: "y" }} $margin={2} />

          <Divider
            $margin={{
              xs: { bottom: 1 },
              sm: { bottom: 1 },
              md: { bottom: 0, right: 2 },
            }}
            $options={{
              additionalStyles: ({ breakpoints }) => `
                @media (max-width: ${breakpoints["md"]}px) {
                  button {
                    width: 100%;
                  }
                }
              `,
            }}
          >
            <Button
              $variant="primary"
              $style="outline"
              type="button"
              onClick={() => push(`/order/${$path}`)}
            >
              View order
            </Button>
          </Divider>

          <Button
            $variant="danger"
            type="button"
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        </Fragment>
      )}
    </Fragment>
  );
};
