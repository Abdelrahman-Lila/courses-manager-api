import mongoose, { version } from "mongoose";
import validator from "validator";
import usersRole from "../utils/user-role.js";

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
    role: {
      type: String,
      enum: [usersRole.ADMIN, usersRole.USER],
      default: usersRole.USER,
    },
  },
  { versionKey: false },
);

export default mongoose.model("User", userSchema);
