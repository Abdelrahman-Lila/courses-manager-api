import express from "express";
import * as userController from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/verify-JWT.js";
const router = express.Router();

router.route("/").get(verifyJWT, userController.getAllUsers);

router.route("/register").post(userController.register);

router.route("/login").post(userController.login);

export default router;
