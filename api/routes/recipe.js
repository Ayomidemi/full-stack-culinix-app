const express = require("express");
const router = express.Router();

const {
  createRecipe,
  updateRecipe,
  getAllRecipes,
  getRecipeById,
  getUserRecipes,
} = require("../controllers/recipeController");

// Define routes
router.post("/create-recipe", createRecipe);
router.put("/update-recipe", updateRecipe);
router.get("/all-recipes", getAllRecipes);
router.get("/recipe/:id", getRecipeById);
router.get("/my-recipes", getUserRecipes);

module.exports = router;
