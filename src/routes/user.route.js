import express from "express";
import * as userController from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/verify-JWT.middleware.js";
import allowedRole from "../middlewares/allowed-role.middleware.js";
import usersRole from "../utils/user-role.js";
const router = express.Router();

router
  .route("/")
  .get(verifyJWT, allowedRole(usersRole.ADMIN), userController.getAllUsers);

router.route("/register").post(userController.register);

router.route("/login").post(userController.login);

export default router;
