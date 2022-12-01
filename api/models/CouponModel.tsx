import { ICoupon } from "@types";
import mongoose, { Schema, model, models, type Model } from "mongoose";

const couponSchema = new Schema<ICoupon>(
  {
    code: String,
    sale: Number,
    usable: Boolean,
    history: [mongoose.Types.ObjectId],
    uses: Number,
  },
  {
    collection: "Coupons",
    timestamps: true,
  }
);

const Coupon: Model<ICoupon> = models.Coupon || model("Coupon", couponSchema);
export default Coupon;
