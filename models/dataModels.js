import mongoose from "mongoose";

const dataModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    desc: { type: String, required: true },
  },
  { timestamps: true }
);
const productDatabase = mongoose.model("dataModel", dataModel);
export default productDatabase;
