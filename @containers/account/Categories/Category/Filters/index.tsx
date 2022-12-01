// State management
import { showConfirmation } from "redux/confirmationSlice";

// Core
import { useRouter } from "next/router";

// Global icons
import { DeleteIcon } from "@icons";

// Global components
import { Button, Divider, Separator } from "@components";

// Vendors
import { useDispatch } from "react-redux";
import mongoose from "mongoose";

// Global @client utilities
import { deleteItems } from "@methods/deleteItems";

// Global types
import { Fragment } from "react";

export const Filters = ({
  setLoading,
}: {
  setLoading: (d: boolean) => void;
}) => {
  const dispatch = useDispatch();

  const {
    query: { id },
    push,
  } = useRouter();

  const handleDelete = () => {
    dispatch(
      showConfirmation({
        title: "Category Deletion",
        message:
          "Are you sure you want to delete this category, this will remove it forever.",
        action: () =>
          deleteItems({
            target: new mongoose.Types.ObjectId(id as string),
            setLoading,
            model: "categories",
            dispatch: dispatch,
            onSuccess: () => {
              push("/account/categories");
            },
          }),
      })
    );
  };

  return (
    <Fragment>
      <Button
        $variant="primary"
        $style="outline"
        type="button"
        onClick={() => push(`/account/categories`)}
        icon={{
          $icon: "arrow-left",
          $size: 20,
        }}
      >
        Back
      </Button>

      <Separator $axis={{ xs: "x", sm: "x", md: "y" }} $margin={2} />

      <Divider
        $options={{
          additionalStyles: ({ breakpoints }) => `
            @media (max-width: ${breakpoints["md"]}px ) {
              button {
                width: 100%;
              }
            }
          `,
        }}
      >
        <Button
          $variant="danger"
          $style="outline"
          type="button"
          onClick={() => handleDelete()}
        >
          Delete
        </Button>
      </Divider>
    </Fragment>
  );
};
