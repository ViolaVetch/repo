// Vendors
import { Schema, model, models, Types } from "mongoose";

// Local schemas
import { walletSchema, userSchema } from "./UserModel";

// Vendor types
import type { Model } from "mongoose";

// Global types
import type { IPayout, IPayoutBalance } from "@types";

export const Balance = new Schema<IPayoutBalance>({
  wallet: walletSchema,
  amount: Number,
  isActive: Boolean,
});

export const Log = new Schema({
  owner: userSchema,
  user: userSchema,
});

const PayoutSchema = new Schema<IPayout>(
  {
    balances: [Balance],
    owner: Types.ObjectId,
    paid: Boolean,
    log: Log,
  },
  {
    collection: "Payouts",
    timestamps: true,
  }
);

export const Payout: Model<IPayout> =
  models.Payout || model("Payout", PayoutSchema);
