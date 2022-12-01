// Vendors
import { Schema, model, models, Types } from "mongoose";

// Vendor types
import type { Model } from "mongoose";

// Global types
import type { IAmount } from "@types";

const AmountSchema = new Schema<IAmount>(
  {
    order: Types.ObjectId,
    owner: Types.ObjectId,
    currency: Types.ObjectId,
    amount: Number,
    paid: Boolean,
  },
  {
    collection: "Amounts",
    timestamps: true,
  }
);

export const Amount: Model<IAmount> =
  models.Amount || model("Amount", AmountSchema);
