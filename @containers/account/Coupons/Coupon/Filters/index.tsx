// Global icons
import { DeleteIcon } from "@icons";

// Redux state manager
import { showConfirmation } from "redux/confirmationSlice";

// Global components
import { Button, Separator } from "@components";

// Vendors
import { useDispatch } from "react-redux";

// Core
import { useRouter } from "next/router";

// Global @client utilities
import { deleteItems } from "@methods/deleteItems";
import { Fragment } from "react";

export default function Filters({
  setLoading,
  mode,
}: {
  setLoading: (a: boolean) => void;
  mode: "add" | "update";
}) {
  const dispatch = useDispatch();
  const {
    query: { id },
    push,
  } = useRouter();

  const handleDelete = () => {
    dispatch(
      showConfirmation({
        title: "Coupon Deletion",
        message:
          "Are you sure you want to delete this coupon, users wont be able to use it anymore.",
        action: () =>
          deleteItems({
            model: "coupons",
            target: id as string,
            setLoading,
            dispatch,
            onSuccess: () => {
              push("/account/coupons");
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
        onClick={() => push(`/account/coupons`)}
        icon={{
          $icon: "arrow-left",
          $size: 20,
        }}
      >
        Back
      </Button>

      {mode === "update" && (
        <Fragment>
          <Separator $axis={{ xs: "x", sm: "x", md: "y" }} $margin={2} />

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
}
