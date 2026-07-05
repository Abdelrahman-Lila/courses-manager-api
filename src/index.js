import express from "express";
import mongoose, { model } from "mongoose";

import Course from "./models/course.model.js";
import coursesRouter from "./routes/course.route.js";
import User from "./models/user.model.js";
import usersRouter from "./routes/user.route.js";

import "dotenv/config";
import cors from "cors";

const app = express();
const port = process.env.port;
const url = process.env.databaseUrl;

try {
  await mongoose.connect(url);
  console.log("connected to database successfully");
} catch (err) {
  console.log(`error: ${err}`);
}

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);

// app.use('*', (res, req) => {
//   return res.status(404).json({ msg: "This page is not found" });
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
