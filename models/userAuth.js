import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const UserDataModel = mongoose.model("userModel", userModel);
export default UserDataModel;
