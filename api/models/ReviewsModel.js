const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewsSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewer: String,
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

const ReviewsModel = mongoose.model("Reviews", reviewsSchema);
module.exports = ReviewsModel;
