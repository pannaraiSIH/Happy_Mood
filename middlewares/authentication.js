import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader && !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Invalid token");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid token");
  }
};

export default authentication;
