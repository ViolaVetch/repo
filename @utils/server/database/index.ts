import mongoose from "mongoose";

export const database = async () => {
  return await mongoose.connect(process.env.MONGO_DB!);
};
