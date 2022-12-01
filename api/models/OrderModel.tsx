// Vendors
import { Schema, model, models, type Model, Types } from "mongoose";

// Schema
import { Code } from "./ProductModel";

// Global types
import { IOrder } from "@types";

const Variant = new Schema(
  {
    _id: Types.ObjectId,
    name: String,
    quantity: Number,
    price: Number,
    codes: [Code],
  },
  { _id: false }
);

const Product = new Schema(
  {
    _id: Types.ObjectId,
    owner: Types.ObjectId,
    name: String,
    variants: [Variant],
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    status: { type: String, default: "created" },
    products: [Product],
    cc: { type: Object },
    event: { type: Object },
    path: { type: String, unique: true },
    coupon: { type: Object },
    user: { type: Types.ObjectId },
    email: { type: String },
    issuesReplaced: { type: Boolean },
  },
  {
    collection: "Orders",
    timestamps: true,
  }
);

const Order: Model<IOrder> = models.Order || model("Order", orderSchema);
export default Order;
