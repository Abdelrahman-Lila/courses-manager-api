import express from "express";
import * as coursesController from "../controllers/course.controller.js";
import { validationSchema } from "../middlewares/validation.middleware.js";
import verifyJWT from "../middlewares/verify-JWT.middleware.js";
import allowedRole from "../middlewares/allowed-role.middleware.js";
import usersRole from "../utils/user-role.js";

const router = express.Router();

router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(
    verifyJWT,
    allowedRole(usersRole.ADMIN),
    validationSchema(),
    coursesController.addCourse,
  );

router
  .route("/:courseId")
  .get(coursesController.getCourse)
  .patch(
    verifyJWT,
    allowedRole(usersRole.ADMIN),
    coursesController.updateCourse,
  )
  .delete(
    verifyJWT,
    allowedRole(usersRole.ADMIN),
    coursesController.deleteCourse,
  );

export default router;
