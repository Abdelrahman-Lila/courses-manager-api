import express from "express";
import multer from "multer";

import * as userController from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/verify-JWT.middleware.js";
import allowedRole from "../middlewares/allowed-role.middleware.js";
import usersRole from "../utils/user-role.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads");
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    const filename = `user-${req.body.email}.${extension}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[0];
  if (fileType !== "image") {
    cb(new Error("Accepts images only"), false);
  } else {
    cb(null, true);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

router
  .route("/")
  .get(verifyJWT, allowedRole(usersRole.ADMIN), userController.getAllUsers);

router
  .route("/register")
  .post(upload.single("avatar"), userController.register);

router.route("/login").post(userController.login);

export default router;
