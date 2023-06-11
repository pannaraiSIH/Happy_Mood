import express from "express";
import {
  calculateCalorie,
  getCalorie,
} from "../controllers/calorieController.js";
const router = express.Router();

import authentication from "../middlewares/authentication.js";

router.route("/").get(getCalorie).post(authentication, calculateCalorie);

export default router;
