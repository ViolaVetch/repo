// Core types
import type { NextApiRequest, NextApiResponse } from "next";

// Global models
import { Website, Order, Coupon, Product } from "api/models";
import { database, purchaseCodes, sendEmail } from "@utils/server";

// Global types
import {
  ICartProduct,
  ICode,
  ICoupon,
  IOrder,
  IOrderProduct,
  IOrderVariant,
  IResponse,
} from "@types";

// Vendors
import { getSession } from "next-auth/react";

// Global utils
import { getResponse } from "@utils/server";

import {
  fetchOrdersWithAuth,
  fetchOrdersWithoutAuth,
  updateOrder,
  deleteOrder,
} from "api/controllers/orders";

// Vendors
import coinbase from "coinbase-commerce-node";
import { generateSlug } from "@utils/shared";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get NextAuth session to check if user is authenticated
  const session = await getSession({ req });

  // Wait for the server to connect with DB
  await database();

  // Find the current instance
  // If instance isn't found, return an error
  const website = await Website.findOne({});
  if (!website) return res.status(500).send("Something went wrong");

  // Manage POST requests, used for order fetches
  if (req.method === "GET") {
    // Declaring the response which will be sent on the end of the
    // response function
    let response: IResponse;

    // Fetch pagination settings from router query
    const {
      query: { isPublic, ...query },
    } = req;

    /**
     * If the isPublic key is enabled, this means that
     * the fetch is coming from pages/order/{path}
     */
    if (isPublic) response = await fetchOrdersWithoutAuth({ query });
    /**
     * When theuser is logged in, we check if it's a reseller
     * they should view their own products
     * or if it's an adminand can view everything
     */ else if (session)
      response = await fetchOrdersWithAuth({
        query,
        user: session.user,
      });
    /**
     * If nothing of the above, just return an error
     */ else {
      response = getResponse({ status: "error", model: "Order" });
    }

    // Return a response
    return res.status(response.code).send(response);
  }

  // Manage PUT requests, used for order updates
  if (req.method === "POST") {
    // Sync with Coinbase Commerce
    var Client = coinbase.Client;
    Client.init(website.coinbaseApi);
    var Checkout = coinbase.resources.Checkout;

    // Destructure request body
    const data = req.body;
    // Create order id
    const orderId = new mongoose.Types.ObjectId();

    // Declar local coupon( to be filled with the provided coupon id )
    let currentCoupon: ICoupon | undefined;

    // Check if a discount applies, if yes, find the coupon
    if (data["coupon"])
      currentCoupon = await Coupon.findOne({
        _id: new mongoose.Types.ObjectId(data["coupon"]._id),
      }).lean();

    // Declare if coupon is usable
    let isCurrentCouponUsable: boolean = false;

    if (currentCoupon) {
      isCurrentCouponUsable =
        currentCoupon["usable"] &&
        currentCoupon["history"].length < currentCoupon["uses"];
    }

    try {
      let response: IResponse;

      // Map products and restructure
      const mappedProducts: ICartProduct[] = data.products.map(
        ({ _id, currentVariant, quantity }: any) => ({
          _id,
          currentVariant,
          quantity,
        })
      );

      // Reduce products, grab different variants and reduce them to products
      const reducedProducts = mappedProducts.reduce(
        (previousValue: ICartProduct[], currentValue) => {
          // If there's any previous value
          if (previousValue) {
            // The found
            const [t] = previousValue.filter(
              (el) => el._id == currentValue._id
            );

            // Without the found
            const wt: ICartProduct[] = previousValue.filter(
              (el) => el._id != currentValue._id
            );

            // If the found is found
            if (t) {
              return [
                ...wt,
                {
                  ...currentValue,
                  _id: currentValue._id,
                  // Merge the found variants within the same
                  variants: [
                    ...t.variants,
                    {
                      ...currentValue.currentVariant,
                      quantity: currentValue.quantity,
                    },
                  ],
                },
              ];
            }

            // Return if we don't have the same values
            return [
              ...previousValue,
              {
                ...currentValue,
                _id: currentValue._id,
                variants: [
                  {
                    ...currentValue.currentVariant,
                    quantity: currentValue.quantity,
                  },
                ],
              },
            ];
          }

          // If previous value doesn't exist, create the first step
          else {
            return [
              {
                ...currentValue,
                _id: currentValue._id,
                variants: [
                  {
                    ...currentValue.currentVariant,
                    quantity: currentValue.quantity,
                  },
                ],
              },
            ];
          }
        },
        []
      );

      // Check if products quantity suffices the request
      const products: IOrderProduct[] = await Promise.all(
        reducedProducts.map(async (el: IOrderProduct) => {
          const product = await Product.findOne({ _id: el._id }).lean();

          // Throw an error if product isn't found
          if (!product) throw Error("Something went wrong");

          // Grab valid codes
          const codes = await purchaseCodes({
            product,
            variants: el.variants,
            as: "pending",
            order: orderId,
          });

          // Throw an error if product isn't found
          if (codes.length == 0) throw Error("Something went wrong");

          // Extract exact variants needed
          const variants = el.variants.map((v: IOrderVariant) => {
            const variantCodes = codes.filter(
              (code: ICode) => code.variant == v._id
            );

            return {
              _id: v["_id"],
              name: v["name"],
              price: v["price"],
              quantity: v["quantity"],
              min: v["min"],
              codes: variantCodes,
            };
          });

          return {
            _id: product._id,
            name: product.name,
            owner: product.owner,
            variants,
          };
        })
      );

      // Handle checkout name
      const handleName = () => {
        if (data.products.length === 1) return data.products[0].name;
        else
          return (
            data.products[0].name +
            ", and " +
            (data.products.length - 1) +
            " other products."
          );
      };

      // Checkout description
      const handleDescription = data.products
        .map((product: IOrderProduct) => product.name)
        .join(", ");

      // Checkout total
      const total =
        currentCoupon &&
        isCurrentCouponUsable &&
        parseFloat(currentCoupon["sale"].toString())
          ? data["total"] -
            data["total"] * (parseFloat(currentCoupon["sale"].toString()) / 100)
          : data["total"];

      const handleSuccess = async (cc: any): Promise<IResponse<IOrder>> => {
        let response: IResponse<IOrder>;

        const initialData = {
          _id: orderId,
          products: products,
          status: "created",
          cc,
          email: data.email,
          path: generateSlug({ length: 15, type: "alphanumeric" }),
        };

        try {
          // Declare order body
          let datas;

          // If discount applies, store it on the data
          if (currentCoupon && isCurrentCouponUsable) {
            // Strip current coupon from unnecessary keys
            const { history, uses, usable, ...currentCouponCleaned } =
              currentCoupon;

            datas = { ...initialData, coupon: currentCouponCleaned };
          } else {
            datas = initialData;
          }

          // Create order
          const initOrder = await Order.create({
            ...datas,
          });

          if (initOrder) {
            if (currentCoupon && isCurrentCouponUsable) {
              // Update current coupon
              await Coupon.findOneAndUpdate(
                { _id: currentCoupon["_id"] },
                {
                  history: [...currentCoupon.history, initOrder],
                }
              );
            }

            // Send email
            const client = await sendEmail({
              fromName: website.companyName,
              fromEmail: website.mailSender,
              to: initOrder.email,
              logo: website.websiteLogo,
              subject: "Purchase successful",
              apiKey: website.mailKey,
              body: `
                <h2>Thank you for your purchase</h2>
                <h4>Order ID ${initOrder["path"]}</h4>
                <p>
                  An order page was created for you, please use the link below to
                  view your order, make the payment with your preferred payment
                  method, or view the coupons.
                </p>
                <a
                  target="_blank"
                  href="${process.env.NEXTAUTH_URL}/order/${initOrder["path"]}"
                  ><button>View order</button></a
                >
              `,
            })
              .then(() => ({ success: true }))
              .catch(() => ({ success: false }));

            response = {
              code: 200,
              status: "success",
              message: `Order created successfully, ${
                client.success ? "email sent" : "but email couldn't be sent."
              }`,
              data: {
                items: [initOrder],
                length: 1,
              },
            };
          } else
            response = {
              code: 500,
              status: "error",
              message: "Something wen't wrong while trying to create Order.",
            };
        } catch (error) {
          response = {
            code: 500,
            status: "error",
            message: "Something wen't wrong while trying to create Order.",
          };
        }

        return response;
      };

      // Checkout
      const checkout = await Checkout.create({
        name: handleName(),
        description: `You are currently purchasing the following products: ${handleDescription}.`,
        pricing_type: "fixed_price",
        local_price: { amount: total, currency: "USD" },
        requested_info: [],
      });

      // Checkout
      const order = await handleSuccess(checkout);

      // Overwrite response with the success resposne
      response = order;

      // Return response
      return res.status(response.code).send(response);
    } catch (e) {
      const response = getResponse({ status: "error", model: "Order" });
      // Return response
      return res.status(response.code).send(response);
    }
  }

  // If user has no access, return an error
  if (!session) {
    return res
      .status(401)
      .send({ error: "Please login to perform the action." });
  }

  // Manage PUT requests, used for order updates
  if (req.method === "PUT") {
    // Declaring the response which will be sent on the end of the
    // response function
    let response: IResponse;

    // Fetch request body
    const { body } = req;

    // Try to update order, store the given response
    response = await updateOrder({ body, user: session["user"], website });

    // Return a response
    return res.status(response.code).send(response);
  }

  // Manage DELETE requests, used for order updates
  if (req.method === "DELETE") {
    // If user has no access, return an error
    if (session["user"]["role"] !== "admin") {
      return res
        .status(401)
        .send({ error: "You're not authorized to perform this action." });
    }

    // Declaring the response which will be sent on the end of the
    // response function
    let response: IResponse;

    // Fetch request body
    const { query } = req;

    // Try to update order, store the given response
    response = await deleteOrder({ query, user: session["user"] });

    // Return a response
    return res.status(response.code).send(response);
  }
}
