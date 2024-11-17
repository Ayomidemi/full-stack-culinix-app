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
  },
  { timestamps: true }
);

const RecipeModel = mongoose.model("Recipe", recipeSchema);
module.exports = RecipeModel;
