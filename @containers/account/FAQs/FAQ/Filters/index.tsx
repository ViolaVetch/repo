import { AddIcon, DeleteIcon, EditIcon, ArrowIcon } from "@icons";
import { showConfirmation } from "redux/confirmationSlice";

// vendors
import { useDispatch } from "react-redux";
import styled from "styled-components";

// Core
import { Fragment } from "react";

import { useRouter } from "next/router";

// Global @client utilities
import { Button, Separator, Divider } from "@components";

// Global methods
import { postItems } from "@methods/postItems";
import { putItems } from "@methods/putItems";
import { deleteItems } from "@methods/deleteItems";

// Glbobal types
import { IFaq } from "@types";

export default function Filters({
  setLoading,
  setFaq,
  faq,
  mode,
}: {
  setLoading: (a: boolean) => void;
  setFaq: (a: IFaq) => void;
  faq: IFaq;
  mode: "add" | "update";
}) {
  const dispatch = useDispatch();
  const { push } = useRouter();

  const handleDelete = () => {
    dispatch(
      showConfirmation({
        title: "Faq Deletion",
        message: "Are you sure you want to delete this faq from the platform?",
        action: () =>
          deleteItems({
            model: "faqs",
            setLoading,
            target: faq["_id"],
            dispatch,
            onSuccess: () => {
              push("/account/faqs");
            },
          }),
      })
    );
  };

  const handleUpdate = () =>
    putItems({
      model: "faqs",
      target: faq["_id"],
      data: faq,
      setLoading,
      dispatch,
      onSuccess: ({ data }) => {
        // Grab the first item returned
        const [item] = data["items"];
        // Store it locally
        setFaq(item);
      },
    });

  const handleCreate = () =>
    postItems({
      model: "faqs",
      data: faq,
      setLoading,
      dispatch,
      onSuccess: ({ data }) => {
        // Grab the first item returned
        const [item] = data["items"];
        // Push items
        push(`/account/faqs/${item["_id"]}`);
      },
    });

  if (mode === "add")
    return (
      <Fragment>
        <Button
          $variant="primary"
          $style="outline"
          type="button"
          onClick={() => push(`/account/faqs`)}
          icon={{
            $icon: "arrow-left",
            $size: 20,
          }}
        >
          Back
        </Button>

        <Separator $axis={{ xs: "x", sm: "x", md: "y" }} $margin={2} />

        <Button $variant="primary" type="button" onClick={() => handleCreate()}>
          <AddIcon size="1.25em" color="#fff" />
          Create
        </Button>
      </Fragment>
    );
  else
    return (
      <Fragment>
        <Button
          $variant="primary"
          $style="outline"
          type="button"
          onClick={() => push(`/account/faqs`)}
          icon={{
            $icon: "arrow-left",
            $size: 20,
          }}
        >
          Back
        </Button>

        <Separator $axis={{ xs: "x", sm: "x", md: "y" }} $margin={2} />

        <Button
          $variant="primary"
          $style="outline"
          type="button"
          onClick={() => handleDelete()}
        >
          <DeleteIcon $size={24} />
          Delete
        </Button>

        <Divider
          $margin={{
            xs: { top: 1 },
            sm: { top: 1 },
            md: { top: 0, left: 2 },
          }}
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
            $variant="primary"
            type="button"
            onClick={() => handleUpdate()}
          >
            <EditIcon $size={24} $color="white" />
            Update
          </Button>
        </Divider>
      </Fragment>
    );
}
