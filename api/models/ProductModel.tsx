// Vendors
import mongoose, { Schema, models } from "mongoose";

// Vendor types
import type { Model } from "mongoose";

// Global types
import type { IProduct } from "@types";

export const Code = new Schema({
  code: { type: String },
  variant: { type: mongoose.Types.ObjectId },
  order: { type: mongoose.Types.ObjectId },
  status: { type: Number, default: 0 },
  replacement: Object,
});

export const Variant = new Schema({
  name: { type: String },
  price: { type: Number, default: 0 },
  min: { type: Number, default: 1 },
  max: { type: Number },
});

const productSchema = new Schema<IProduct>(
  {
    name: { type: String },
    path: { type: String },
    thumbnail: { type: String },
    description: { type: String },
    views: { type: Number, default: 0 },
    promote: { type: Boolean },
    visibility: { type: Boolean },
    codes: [Code],
    categories: [{ type: String }],
    variants: [Variant],
    user: { type: mongoose.Types.ObjectId, required: true },
    owner: { type: mongoose.Types.ObjectId, required: true },
  },
  {
    collection: "Products",
    timestamps: true,
  }
);

const Product: Model<IProduct> =
  models.Product || mongoose.model("Product", productSchema);
export default Product;
