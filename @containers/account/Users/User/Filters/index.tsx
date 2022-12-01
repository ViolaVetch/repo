// Core
import { Fragment } from "react";

// Global slices
import { showConfirmation } from "redux/confirmationSlice";

// Global components
import { Button, Separator } from "@components";

// Global icons
import { DeleteIcon } from "@icons";

// Core
import { useRouter } from "next/router";

// Vendors
import mongoose from "mongoose";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// Global methods
import { deleteItems } from "@methods/deleteItems";

export const Filters = (props: any) => {
  // Handle notifications through redux
  const dispatch = useDispatch();

  // Handle route update
  const { push } = useRouter();

  // Current logged-in user
  const { data: session } = useSession();

  const handleDelete = () => {
    dispatch(
      showConfirmation({
        title: "User Deletion",
        message:
          "Are you sure you want to delete this user, this will also remove all this user data.",
        action: () =>
          deleteItems({
            model: "users",
            target: new mongoose.Types.ObjectId(props.id as string),
            onSuccess: () => push("/account/users"),
            setLoading: props.setLoading,
            dispatch,
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
        onClick={() => push(`/account/users`)}
        icon={{
          $icon: "arrow-left",
          $size: 20,
        }}
      >
        Back
      </Button>

      {props["mode"] === "update" && session?.user._id !== props.id && (
        <>
          <Separator $axis={{ xs: "x", sm: "x", md: "y" }} $margin={2} />

          <Button
            $variant="primary"
            type="button"
            onClick={() => handleDelete()}
          >
            <DeleteIcon $color="white" $size={24} />
            Delete
          </Button>
        </>
      )}
    </Fragment>
  );
};
