import { DeleteIcon } from "@icons";
import { showConfirmation } from "redux/confirmationSlice";
import { Button, Separator } from "@components";

// Vendors
import { useDispatch } from "react-redux";

// Core
import { useRouter } from "next/router";

// Global methods
import { deleteItems } from "@methods/deleteItems";
import { Fragment } from "react";

export default function Filters({
  setLoading,
}: {
  setLoading: (a: boolean) => void;
}) {
  const dispatch = useDispatch();
  const {
    push,
    query: { id },
  } = useRouter();

  const handleDelete = () => {
    dispatch(
      showConfirmation({
        title: "Page Deletion",
        message:
          "Are you sure that you want to delete this page, this will also delete its data.",
        action: () => {
          deleteItems({
            target: id as string,
            model: "pages",
            onSuccess: () => {
              push(`/account/pages`);
            },
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
        onClick={() => push(`/account/pages`)}
        icon={{
          $icon: "arrow-left",
          $size: 20,
        }}
      >
        Back
      </Button>

      <Separator $axis={{ xs: "x", sm: "x", md: "y" }} $margin={2} />

      <Button
        type="button"
        $variant="danger"
        $style="outline"
        onClick={() => handleDelete()}
      >
        Delete
      </Button>
    </Fragment>
  );
}
