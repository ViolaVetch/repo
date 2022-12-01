// Vendors
import styled from "styled-components";

// Core
import { useRouter } from "next/router";

const Component = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-end;
  padding-bottom: 1em;
`;

// Global components
import { Button } from "@components";

// Global icons
import { DeleteIcon } from "@icons";

// Vendors
import mongoose from "mongoose";

// State management
import { showConfirmation } from "redux/confirmationSlice";
import { deleteItems } from "@methods/deleteItems";
import { useDispatch } from "react-redux";

export const Filters = (props: any): any => {
  const dispatch = useDispatch();

  //
  const { push } = useRouter();

  const handleCloseAccount = (): any => {
    props.dispatch(
      showConfirmation({
        title: "Delete Account",
        message: "Are you sure you want to delete your account?",
        action: () =>
          deleteItems({
            model: "users",
            target: new mongoose.Types.ObjectId(props.user.id as string),
            onSuccess: () => push("/account/users"),
            setLoading: props.setLoading,
            dispatch,
          }),
      })
    );
  };

  return (
    <Component {...props}>
      <Button
        $variant="primary"
        $style="outline"
        type="button"
        onClick={() => handleCloseAccount()}
      >
        <DeleteIcon $size={24} />
        Delete Profile
      </Button>
    </Component>
  );
};
