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
} = require("../controllers/recipeController");

// Define routes
router.post("/create-recipe", createRecipe);
router.put("/update-recipe/:id", updateRecipe);
router.put("/:id/like", likeRecipeByUsers);
router.put("/:id/dislike", dislikeRecipeByUsers);
router.get("/all-recipes", getAllRecipes);
router.get("/recipe/:id", getRecipeById);
router.get("/my-recipes", getUserRecipes);
router.delete("/delete-recipe/:id", deleteRecipe);

module.exports = router;
