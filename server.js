import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";

import express from "express";
const app = express();

//connect DB
import connectDB from "./db/connectDB.js";

// router
import authRouter from "./routes/authRouter.js";
import calorieRouter from "./routes/calorieRouter.js";

// middleware
import errorHandlerMiddleware from "./middlewares/errorHandler.js";

import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/calorie", calorieRouter);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Starting server on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
