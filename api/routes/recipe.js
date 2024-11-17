const express = require("express");
const router = express.Router();

const {
  createRecipe,
  updateRecipe,
  getAllRecipes,
  getRecipeById,
  getUserRecipes,
  deleteRecipe,
  dislikeRecipeByUsers,
  likeRecipeByUsers,
  addRemoveFavorite,
  getFavorites,
} = require("../controllers/recipeController");

// Define routes
router.post("/create-recipe", createRecipe);
router.put("/update-recipe/:id", updateRecipe);
router.put("/:recipeId/favorite", addRemoveFavorite);
router.put("/:id/like", likeRecipeByUsers);
router.put("/:id/dislike", dislikeRecipeByUsers);
router.get("/all-recipes", getAllRecipes);
router.get("/recipe/:id", getRecipeById);
router.get("/my-recipes", getUserRecipes);
router.get("/favorites", getFavorites);
router.delete("/delete-recipe/:id", deleteRecipe);

module.exports = router;
