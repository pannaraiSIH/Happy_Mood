import mongoose from "mongoose";

const CalorieSchema = new mongoose.Schema(
  {
    calorie: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Calorie", CalorieSchema);
