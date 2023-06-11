import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  updateUser,
} from "../controllers/authController.js";

import authentication from "../middlewares/authentication.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/updateUser").post(authentication, updateUser);

export default router;
