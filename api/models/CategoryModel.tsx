import { IProductCategory } from "@types";
import { Schema, model, models } from "mongoose";

const categorySchema = new Schema<IProductCategory>(
  {
    name: String,
    path: { type: String, unique: true },
  },
  {
    collection: "Categories",
    timestamps: true,
  }
);

const Category = models.Category || model("Category", categorySchema);
export default Category;
