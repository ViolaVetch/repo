// Global models
import { AVAILABLECODES } from "@constants";

// Global types
import { IOrderVariant, IProduct } from "@types";

// 
import { Product } from "api/models";
import mongoose from "mongoose";

export const purchaseCodes = async ({
  product,
  variants,
  order,
  as = "completed",
}: {
  product: IProduct;
  variants: IOrderVariant[];
  order: mongoose.Types.ObjectId,
  as?: "completed" | "pending";
}) => {
  // Get to status
  const getToStatus = () => {
    switch (as) {
      case "completed":
        return 1;
      case "pending":
        return 2;
    }
  };

  // Extract codes specific on the quantity
  const codes = product.codes.filter((code) =>
    AVAILABLECODES.includes(code["status"])
  );

  // Extract purchased codes
  const purchasedCodes = variants
    .map((v) => {
      // Map only the ones with the same variant
      const variantCodes = codes.filter((el) => v._id == el.variant);

      // Spare exact codes needed from quantity
      const purchasedCodes = variantCodes.slice(0, v.quantity);

      // Return spared ones
      return purchasedCodes;
    })
    .flat(1);

  // Make those purchased codes sold
  const purchasedCodesValidated = await Promise.all(
    purchasedCodes.map((v) =>
      // const example = {
      //   code: "AqgJOufsID",
      //   variant: new ObjectId("637abdf7777d3c4494f74cd5"),
      //   status: 0,
      //   _id: new ObjectId("637abe29777d3c4494f74cf3"),
      // };
      ({
        ...v,
        order,
        status: getToStatus(),
      })
    )
  );

  // Extract only IDs of purchased codes
  const purchasedCodesIds = await Promise.all(
    purchasedCodes.map((el) => el._id)
  );

  // Store all OLD(Except the one's we've purchased) and NEW purchased codes in one array
  const updatedCodes = [
    ...product.codes.filter((oc) => !purchasedCodesIds.includes(oc._id)),
    ...purchasedCodesValidated,
  ];

  // Update products
  await Product.findOneAndUpdate({ _id: product._id }, { codes: updatedCodes });

  // Extract product codes
  return purchasedCodes.map((el) => el);
};
