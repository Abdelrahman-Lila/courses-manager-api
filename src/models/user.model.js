import mongoose, { version } from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is Required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is Required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { versionKey: false },
);

export default mongoose.model("User", userSchema);
