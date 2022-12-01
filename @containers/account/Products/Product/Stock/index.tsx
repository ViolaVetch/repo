// Core types
import type { FC } from "react";

// Core
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";

// Vendors
import { useDispatch } from "react-redux";
import Mongoose from "mongoose";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";

// Local components
import { Filters } from "./Filters";
import { List } from "./List";

// Global types
import type { IVariant, IProduct as ProductType, ICode } from "@types";

// Global state
import { hideNotification, showNotification } from "redux/notificationSlice";

// Global components
import {
  Separator,
  Loader,
  Textareaium,
  Button,
  Divider,
  Heading,
} from "@components";
import { Account } from "@components/Layouts";

// Global icons
import { AddIcon } from "@icons";

// Global types
import type { IProduct } from "@types";

// GLobal @methods
import { getItems } from "@methods/getItems";
import { putItems } from "@methods/putItems";
import { Header } from "@components/Account";

export interface IProductStockFields extends IProduct {
  currentVariant: IVariant;
  mode: "update" | "add";
}

const Coupons: FC<{}> = () => {
  const dispatch = useDispatch();
  const [coupons, setCoupons] = useState("");

  // Handle state
  const { values, setFieldValue } = useFormikContext<IProductStockFields>();

  const handleAddCoupon = () => {
    if (coupons === "") {
      dispatch(
        showNotification({
          success: false,
          message: `You don't have any products.`,
        })
      );
    } else {
      // Split(convert to code strings) coupons by new rows, delete empty rows and replace spaces with dashes
      const convertedCoupons = coupons
        .split(/\r?\n/)
        .filter((element) => element)
        .map((element) => element.replace(" ", "-"));

      const filterConvertedCoupons = convertedCoupons.reduce((prev, next) => {
        const found = prev.includes(next);

        if (found) return [...prev];
        else return [...prev, next];
      }, [] as string[]);

      // Convert current product codes into an array of strings so we can cross check if we already have one
      const currentCodesConverted = values["codes"].map(({ code }) => code);

      // Exclude current coupons if similar are found
      const filteredCoupons = filterConvertedCoupons.filter(
        (el) => !currentCodesConverted?.includes(el)
      );

      // Exclude current coupons if similar are found
      const similarFoundings = filterConvertedCoupons.filter((el) =>
        currentCodesConverted?.includes(el)
      );

      // Declare empty array with coupons
      let coup: ICode[] = [];

      // Fill empty array if we have new coupons + a variant
      if (filteredCoupons && values["currentVariant"])
        coup = filteredCoupons.map((item) => ({
          _id: new Mongoose.Types.ObjectId(),
          code: item,
          variant: values["currentVariant"]._id,
          status: 0,
        }));

      // If there are new coupons, add them
      values && setFieldValue("codes", [...values["codes"], ...coup]);

      // Re-add old coupons or empty textarea
      setCoupons(similarFoundings.length ? similarFoundings.join("\r\n") : "");

      // Show error that some coupons were not replaced
      if (similarFoundings.length)
        dispatch(
          showNotification({
            success: false,
            message: `The following products were already there: ${similarFoundings.join(
              ", "
            )}`,
          })
        );
      // Hide errors if everything's alright
      else dispatch(hideNotification(""));
    }
  };

  return (
    <>
      <Textareaium
        style={{ width: "100%", height: "30vh" }}
        label="Products List"
        placeholder="Products list (Separated in new lines)"
        value={coupons}
        changeValue={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCoupons(e.target.value)
        }
      />

      <Button
        $variant="primary"
        $style="outline"
        icon={{
          $icon: "plus",
          $size: 20,
          $color: "secondary",
        }}
        type="button"
        onClick={() => handleAddCoupon()}
      >
        Add products
      </Button>
    </>
  );
};

export const Stock = () => {
  const dispatch = useDispatch();

  // Handle router
  const { push, query } = useRouter();
  const { id } = query;

  //
  const [product, setProduct] = useState<ProductType | null>(null);
  const memoizedProduct = useMemo(() => product, [product]);
  const [loading, setLoading] = useState<boolean>(true);

  // Manage which variant we're editing
  const [currentVariant, setCurrentVariant] = useState<IVariant | null>(null);

  useEffect(() => {
    if (product === null)
      getItems<IProduct>({
        onSuccess: ({ data }) => {
          // Extract items and length
          const { items, length } = data;
          // Check if any data was found
          if (length) {
            // Handle product if found
            const [item] = items;
            // Set product
            setProduct(item);
          } else {
            // Send user to a 404 page
            push("/404");
          }
        },
        setLoading,
        dispatch,
        timeout: 300,
        model: "products",
        query: {
          _id: id,
        },
      });
    else {
      if (!currentVariant) setCurrentVariant(product?.variants[0]);
    }
  }, [product]);

  return (
    <Account>
      {product === null || loading === true ? (
        <Loader />
      ) : currentVariant === null ? (
        <Loader />
      ) : (
        <Formik
          enableReinitialize
          initialValues={
            {
              ...memoizedProduct,
              currentVariant: memoizedProduct?.variants[0],
            } as IProductStockFields
          }
          onSubmit={(data) => {
            putItems({
              model: "products",
              data,
              target: data._id,
              timeout: 300,
              setLoading,
              dispatch,
              onSuccess: async ({ data: { items } }) => {
                const [item] = items;
                // Update current product with the last updates
                // (Position 0 is because of the IResponse type)
                setProduct(item);
              },
            });
          }}
        >
          {({ values, errors }) => (
            <Form style={{ width: "100%" }}>
              <Header $title={values["name"]}>
                <Filters />
              </Header>

              {/* Line between header and content */}
              <Separator $axis="x" $margin={2} />

              <List />

              <Separator $axis="x" $margin={3} />

              <Coupons />
            </Form>
          )}
        </Formik>
      )}
    </Account>
  );
};
