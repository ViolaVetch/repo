// Core types
import type { NextApiRequest, NextApiResponse } from "next";

// Global models
import { Currency, Order, Product, Amount } from "api/models";

// Global @server utilities
import { database, getResponse } from "@utils/server";

// Global API controllers
import { createPayments } from "api/controllers";

// Global types
import { ICode, IOrderProduct, IOrderVariant, IVariant } from "@types";

// Global constants
import { AVAILABLECODES } from "@constants";

// Vendors
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await database();
  // Deconstruct request body
  const data = req["body"];

  // Return a pending status when order is pending
  const handlePending = async (data: any) => {
    try {
      const order = await Order.findOne({
        "cc.id": data.event.data.checkout.id,
      }).lean();

      // Throw an error if order doesn't exist
      if (!order) throw new Error();

      const checkout = await Order.findByIdAndUpdate(order["_id"], {
        status: "pending",
      });

      // Form a successful response
      const response = getResponse({
        status: "success",
        model: "order",
        data: {
          items: [checkout],
          length: 1,
        },
      });

      // Return the successful response
      return res.status(response["code"]).send(response);
    } catch (err) {
      // Form a failed response
      const response = getResponse({ status: "error", model: "order" });

      // Return the failed response
      return res.status(response["code"]).send(response);
    }
  };

  // Handle a confirmed order
  const handleConfirmed = async (data: any) => {
    // Handle event data
    const event = data.event.data;

    try {
      // List all currencies
      const currencies = await Currency.find({}).lean();

      // Find current order
      const order = await Order.findOne({
        "cc.id": data.event.data.checkout.id,
      }).lean();

      // If order is not found, throw an error immediately
      if (!order) throw new Error();

      // If order is already confirmed or unfulfilled
      if (["confirmed", "unfulfilled"].includes(order["status"]))
        throw new Error();

      // Test creating payments
      const amounts = await createPayments({
        payments: event.payments,
        currencies,
        order,
      });

      // Wait until all amounts are settled into the database
      const storeAmounts = await Amount.insertMany(amounts);

      // Check if amounts are stored
      if (!storeAmounts)
        throw new Error("Payment could not be stored, aborting product update");

      // Store replaced products
      let replacedProducts: IOrderProduct[] = [];

      // Start working on code updates
      if (["created", "pending"].includes(order.status))
        // Wait until all updates are done accordingly
        replacedProducts = await Promise.all(
          order.products.map(async (el: IOrderProduct) => {
            // Fetch product so we can grab,
            const fetchedProduct = await Product.findOne({
              _id: el._id,
            }).lean();

            // Throw an error if product isn't found
            if (!fetchedProduct) throw Error("Something went wrong");

            // Find codes for each variant
            const codes = el.variants
              .reduce((previous: (ICode | ICode[])[], current: IVariant) => {
                // Reduce codes into one array
                const cs = current["codes"].map((el) => el);
                // Return array and destructure previous item
                return [...previous, cs];
              }, [])
              .flat(1);

            // Purchase codes with bought status
            const purchaseCodes: ICode[] = codes.map((code) => {
              // Grab the original code
              const [found] = fetchedProduct["codes"].filter(
                (c) => c["_id"].toString() == code["_id"].toString()
              );

              // If code is available (Either status 0 or 2, just mark as sold (status 1))
              if (AVAILABLECODES.includes(found["status"])) {
                return {
                  ...code,
                  order: order["_id"],
                  status: 1,
                };
              }
              // Otherwise, create a duplicate code, and let it be awaiting to be fulfilled
              else {
                return {
                  ...code,
                  order: order["_id"],
                  _id: new mongoose.Types.ObjectId(),
                  status: 5,
                  code: "To be fulfilled",
                };
              }
            });

            // Purchase code IDs
            const purchasedCodesIds = purchaseCodes.map((el) =>
              el["_id"].toString()
            );

            /**
             * Store all OLD(Except the one's we've purchased)
             * and NEW purchased codes in one array
             */
            const updatedCodes = [
              ...fetchedProduct.codes.filter(
                (oc: ICode) => !purchasedCodesIds.includes(oc["_id"].toString())
              ),
              ...purchaseCodes,
            ];

            /**
             * Replace current product codes with the new ones
             */
            await Product.findOneAndUpdate(
              { _id: el["_id"] },
              { codes: updatedCodes }
            );

            /**
             * Redirecting products / variants and codes within variants to re-save them on
             * the order
             */
            const variants: IOrderVariant[] = el["variants"].map(
              (variant: IOrderVariant) => {
                const codes = purchaseCodes.filter(
                  (el) => el["variant"].toString() == variant["_id"].toString()
                );

                return {
                  ...variant,
                  codes,
                };
              }
            );

            return {
              _id: el["_id"],
              owner: el["owner"],
              name: el["name"],
              variants,
            };
          })
        );

      const [isOrderFulfilled] = replacedProducts
        .map((el) =>
          el["variants"].map((el) =>
            el["codes"].map((el) => el["status"] === 5)
          )
        )
        .flat(2)
        .filter((el) => el);

      /**
       * Update current order status by marking it confirmed
       * and update products with new statuses
       */
      const checkout = await Order.findByIdAndUpdate(
        order["_id"],
        replacedProducts.length > 0
          ? {
              status: isOrderFulfilled ? "unfulfilled" : "confirmed",
              products: replacedProducts,
              event: data.event,
            }
          : { status: "confirmed", event: data.event }
      );

      // Form a successful response
      const response = getResponse({
        status: "success",
        model: "order",
        data: {
          items: [checkout],
          length: 1,
        },
      });

      // Return the successful response
      return res.status(response["code"]).send(response);
    } catch (err) {
      // Form a failed response
      const response = getResponse({ status: "error", model: "order" });
      // Return the failed response
      return res.status(response["code"]).send(response);
    }
  };

  // Handle failed orders
  const handleFailed = async (data: any) => {
    try {
      const order = await Order.findOne({
        "cc.id": data.event.data.checkout.id,
      }).lean();

      // Check if order exists
      if (!order) throw new Error();

      const checkout = await Order.findByIdAndUpdate(order["_id"], {
        status: "failed",
      });

      // Form a successful response
      const response = getResponse({
        status: "success",
        model: "order",
        data: {
          items: [checkout],
          length: 1,
        },
      });

      // Return the successful response
      return res.status(response["code"]).send(response);
    } catch (err) {
      // Form a failed response
      const response = getResponse({ status: "error", model: "order" });

      // Return the failed response
      return res.status(response["code"]).send(response);
    }
  };

  // Form a failed response
  const response = getResponse({
    status: "success",
    model: "order",
    data: {
      items: [],
      length: 0,
    },
  });

  // Switch between event types
  switch (data?.event?.type) {
    case "charge:confirmed":
      return handleConfirmed(data);
    case "charge:failed":
      return handleFailed(data);
    case "charge:pending":
      return handlePending(data);
    default:
      return res.status(response["code"]).send(response);
  }
}
