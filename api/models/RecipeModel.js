const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeSchema = new Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    kitchen: {
      name: String,
      email: String,
      phoneNumber: String,
    },
    name: String,
    imageUrl: String,
    desc: String,
    ingredients: [String],
    instructions: String,
    cookTime: String,
    category: [String],
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const RecipeModel = mongoose.model("Recipe", recipeSchema);
module.exports = RecipeModel;
