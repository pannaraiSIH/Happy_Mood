import axios from "axios";
import { NotFoundError, BadRequestError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import Calorie from "../models/Calorie.js";

const calculateCalorie = async (req, res) => {
  const {
    body: { gender, age, weight, height, activity },
    user: { userId },
  } = req;

  // check inputs
  if (!gender || !age || !weight || !height || !activity) {
    throw new BadRequestError("Please provide all values");
  }

  let calorie = 0;

  // bmr for female
  if (gender === "female") {
    let bmrForFemale =
      10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161;
    calorie = Math.round(bmrForFemale * Number(activity));
  }

  // bmr for male
  if (gender === "male") {
    let bmrForMale =
      10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5;
    calorie = Math.round(bmrForMale * Number(activity));
  }

  // store calorie in db
  const calorieOfUser = await Calorie.create({
    calorie,
    createdBy: userId,
  });

  res.status(StatusCodes.CREATED).json({
    calorieOfUser: calorieOfUser.calorie,
    createdAt: calculateCalorie.createdAt,
  });
};

const getCalorie = async (req, res) => {
  const { query } = req.query;

  // make external api call
  const options = {
    method: "GET",
    url: `https://api.api-ninjas.com/v1/nutrition?query=${query}`,
    headers: {
      "X-Api-Key": process.env.API_KEY,
    },
  };

  try {
    const response = await axios.request(options);
    const calorie = response.data.map((item) => item.calories).join("");
    res.status(StatusCodes.OK).json({ name: query, calorie });
  } catch (error) {
    throw new NotFoundError(`No results found with ${query} value`);
  }
};

export { calculateCalorie, getCalorie };
