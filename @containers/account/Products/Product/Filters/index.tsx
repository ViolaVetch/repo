// Core
import { useRouter } from "next/router";
import { Fragment } from "react";

// Icons
import { SettingsIcon } from "@icons";

// Local store
import { showConfirmation } from "redux/confirmationSlice";

// Vendors
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";

import { useFormikContext } from "formik";
import mongoose from "mongoose";

// Global
import { Divider, Separator, Button, Dropdown, Icon } from "@components";

// Global site configuration
import SiteConfig from "configs/Site.config";

// Local types
import { IProductFields } from "..";
import { deleteItems } from "@methods/deleteItems";

export const Filters = ({
  setLoading,
}: {
  setLoading: (a: boolean) => void;
}) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  // Form context
  const { values, submitForm, setFieldValue } =
    useFormikContext<IProductFields>();

  // Handle router events
  const { push, query } = useRouter();

  const handleDelete = () => {
    const { id } = query;

    id &&
      dispatch(
        showConfirmation({
          title: "Product Deletion",
          message: "Are you sure you want to delete this product?",
          action: () =>
            deleteItems({
              model: "products",
              target: new mongoose.Types.ObjectId(id as string),
              onSuccess: () => {
                push("/account/products");
              },
              setLoading,
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
        onClick={() => push(`/account/products`)}
        icon={{
          $icon: "arrow-left",
          $size: 20,
        }}
      >
        Back
      </Button>

      {values["mode"] === "update" && (
        <Divider
          $margin={{
            xs: { top: 1 },
            sm: { top: 1 },
            md: { top: 0, left: 2, right: 2 },
          }}
          $options={{
            additionalStyles: () => `
              button {
                width: 100%;
              }
            `,
          }}
        >
          <Button
            $variant="primary"
            $style="outline"
            type="button"
            onClick={() => push(`/account/products/${values["_id"]}/stock`)}
          >
            <SettingsIcon $size={20} />
            Stock Manager
          </Button>
        </Divider>
      )}

      <Divider
        $margin={
          values["mode"] === "update"
            ? {
                xs: { top: 1, bottom: 1 },
                sm: { top: 1, bottom: 1 },
                md: { top: 0, bottom: 0, right: 2 },
              }
            : {
                xs: { top: 1, bottom: 1 },
                sm: { top: 1, bottom: 1 },
                md: { top: 0, bottom: 0, left: 2 },
              }
        }
      >
        <Dropdown
          $placeholder="Categories"
          $type="fetch"
          $name="categories"
          $initialValues={values["categories"]}
          $onUpdate={(items) => {
            // Do nothing if items don't exist
            if (!items) return;

            setFieldValue("categories", items);
          }}
          $fetch={{
            url: `${SiteConfig.API}/categories`,
          }}
          $search={{
            placeholder: "Search categories...",
          }}
          $convertItems={(items) =>
            items.map(({ name, path }: any) => ({
              label: name,
              value: path,
            }))
          }
        />
      </Divider>

      {session?.user["role"] == "admin" && values["mode"] === "update" && (
        <Button $variant="danger" type="button" onClick={() => handleDelete()}>
          Delete
        </Button>
      )}

      {/* Line break */}
      <Separator $axis={{ xs: "x", sm: "x", md: "y" }} $margin={2} />

      <Button
        type="button"
        icon={{
          $icon: values["mode"] === "add" ? "plus" : "save",
          $size: 20,
          $color: "white",
        }}
        onClick={() => {
          setFieldValue("submitted", true);
          submitForm();
        }}
        $variant="primary"
      >
        {values["mode"] == "update" ? "Save changes" : "Create product"}
      </Button>
    </Fragment>
  );
};
