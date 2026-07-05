import express from "express";
import * as coursesController from "../controllers/user.controller.js";
const router = express.Router();

router.route("/").get(coursesController.getAllUsers);

router.route("/register").post(coursesController.register);

router.route("/login").post(coursesController.login);

export default router;
