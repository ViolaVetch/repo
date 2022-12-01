// Vendors
import mongoose, { Schema, models, Types } from "mongoose";

// Vendor types
import type { Model } from "mongoose";

// Global types
import type { IUserWallet, User as UserType } from "@types";

export const walletSchema = new Schema<IUserWallet>(
  {
    currency: Types.ObjectId,
    addr: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const userSchema = new Schema<UserType>(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    percentage: { type: Number },
    password: { type: String, required: true, select: false },
    role: { type: String },
    active: { type: Boolean },
    wallets: { type: [walletSchema] },
    store: { type: String },
    slug: { type: String },
  },
  {
    collection: "Users",
    timestamps: true,
  }
);

const User: Model<UserType> = models.User || mongoose.model("User", userSchema);
export default User;
