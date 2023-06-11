import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // check inputs
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.create({ ...req.body });

  const token = await user.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, email: user.email }, token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  // check email in db
  if (!user) {
    throw new UnauthenticatedError("Invalid email");
  }

  // check password in db
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid password");
  }

  user.password = undefined;

  const token = await user.createJWT();

  res.status(StatusCodes.OK).json({ user, token });
};

const updateUser = async (req, res) => {
  const {
    body: { name, email },
    user: { userId },
  } = req;

  if (!name || !email) {
    throw new BadRequestError("Please provide all values");
  }

  // find user with userId and email
  const user = await User.findOne({ _id: userId, email });

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  // update user's info
  user.name = name;
  user.email = email;

  user.save();

  // create new token with updated info
  const token = await user.createJWT();

  res.status(StatusCodes.OK).json({ user: { name, email }, token });
};

export { registerUser, loginUser, updateUser };
