import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      requred: true,
    },
    lastname: {
      type: String,
      requred: true,
    },
    email: {
      type: String,
      requred: true,
    },
    password: {
      type: String,
      requred: true,
    },
    role: {
      type: String,
      requred: true,
    },
  },
  { timestamps: true }
);
export const userModel = mongoose.model("user", userSchema);
