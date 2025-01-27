const mongoose = require("mongoose");
const { Schema } = mongoose;

const likesSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
});

const LikesModel = mongoose.model("Likes", likesSchema);
module.exports = LikesModel;
