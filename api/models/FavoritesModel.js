const mongoose = require("mongoose");
const { Schema } = mongoose;

const favoriteSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
    required: true,
  },
});

const FavoritesModel = mongoose.model("Favorites", favoriteSchema);
module.exports = FavoritesModel;
