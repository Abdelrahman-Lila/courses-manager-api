import express from "express";
import * as coursesController from "../controllers/course.controller.js";
import { validationSchema } from "../middlewares/validation.middleware.js";
const router = express.Router();

router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(validationSchema(), coursesController.addCourse);

router
  .route("/:courseId")
  .get(coursesController.getCourse)
  .patch(coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

export default router;
