const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeSchema = new Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    nick_name: String,
    imageUrl: String,
    desc: String,
    ingredients: String,
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const RecipeModel = mongoose.model("Recipe", recipeSchema);
module.exports = RecipeModel;
