// Vendors
import { Schema, model, models, Types } from "mongoose";

// Vendor types
import type { Model } from "mongoose";

// Global types
import type { ICurrency } from "@types";

export const currencySchema = new Schema<ICurrency>(
  {
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    decimals: { type: Number, required: true },
  },
  {
    collection: "Currencies",
    timestamps: true,
  }
);

export const Currency: Model<ICurrency> =
  models.Currency || model("Currency", currencySchema);
