import { Schema, model, Model, models } from "mongoose";

// Global types
import { IPage } from "@types";

const pageSchema = new Schema(
  {
    title: String,
    description: String,
    path: { type: String, unique: true },
    views: Number,
    content: String,
    visibility: Boolean,
  },
  {
    collection: "Pages",
    timestamps: true,
  }
);

const Page: Model<IPage> = models.Page || model("Page", pageSchema);
export default Page;
