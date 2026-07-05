import mongoose, { version } from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
  },
  { versionKey: false },
);

export default mongoose.model("Course", courseSchema);
