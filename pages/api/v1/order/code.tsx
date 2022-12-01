// Global models
import { Product } from "api/models";

// Global types
import { ICode, IOrder, IProduct, IResponse } from "@types";

// Global utilities
import { database, getResponse } from "@utils/server";

// Global constants
import { AVAILABLECODES } from "@constants";

export default async function handler(req: any, res: any) {
  let response: IResponse<ICode>;

  await database();

  // Handle coupon replacement
  if (req.method === "POST") {
    try {
      const { product, code } = req.body;

      // Fulfill the current one
      let currentProduct;
      let currentCode: ICode = code;

      // Find and store product
      if (product) currentProduct = await Product.findOne({ _id: product._id });

      if (!currentProduct)
        return res
          .status(500)
          .send("Something went wrong, please try again later");

      // Fetch one available code to insert as a replacement
      const [replacement] = currentProduct.codes.filter(
        (el: ICode) =>
          // The below status [0] should be always 0 since the codes you're
          // replacing wil be for sure immediately snatched
          el.variant == currentCode.variant &&
          AVAILABLECODES.includes(el["status"])
      );

      // Throw an error if code is not replaced a.k.a there's no replacement
      if (!replacement) throw new Error();

      // Find current code and make it a failure
      const replacedCodes = currentProduct.codes.map((el: any) => {
        // Replacement code
        if (
          el.code == replacement.code &&
          el.variant == replacement.variant &&
          el._id == replacement._id
        )
          return {
            ...el._doc,
            status: 4,
          };
        // Failed code
        if (
          el.code == currentCode.code &&
          el.variant == currentCode.variant &&
          el._id == currentCode._id
        )
          return {
            ...el._doc,
            status: 3,
          };
        // Normal
        else return el;
      });

      // Update product with new codes
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: product._id },
        { codes: replacedCodes }
      ).lean();

      // Throw new error if product can't be updated
      if (!updatedProduct) throw new Error("Something went wrong");

      response = getResponse({
        status: "success",
        model: "order",
        data: {
          items: [replacement],
          length: 1,
        },
      });

      res.status(response.code).json(response);
    } catch (error) {
      response = getResponse({
        status: "error",
        model: "order",
      });

      res.status(response.code).json(response);
    }
  }

  // Handle coupon replacement undo
  if (req.method === "PUT") {
    const { product, code } = req.body;

    // Current code (+Replacement to be undone)
    let currentCode: ICode = code;

    console.log(currentCode, product);

    try {
      // Stop if product wasn't assigned
      if (!product) throw new Error();

      // Find and store product
      const currentProduct = await Product.findOne({
        _id: product._id,
      }).lean();

      // Check if product exists, otherwise return an error
      if (!currentProduct)
        return res
          .status(500)
          .send("Something went wrong, please try again later.");

      // Find and amend codes
      const codes = currentProduct["codes"]
        // Flight risk alert
        .map((el) => {
          // Return currentCode.code to "Sold"
          if (el.code == currentCode.code) {
            return {
              ...el,
              status: 1,
            };
          }
          // Return currentCode.replacement to "Ready for sale"
          else if (el.code == currentCode?.replacement?.code) {
            return {
              ...el,
              status: 0,
            };
          }
          // Return each other code to a normal state
          else {
            return el;
          }
        });

      // Update product with new codes
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: product._id },
        { codes }
      ).lean();

      // Throw new error if product can't be updated
      if (!updatedProduct) throw new Error("Something went wrong");

      response = getResponse({
        status: "success",
        model: "order",
        data: {
          items: [currentCode],
          length: 1,
        },
      });

      res.status(response.code).json(response);
    } catch (error) {
      response = getResponse({
        status: "error",
        model: "order",
      });

      res.status(response.code).json(response);
    }
  }
}
