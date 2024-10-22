const jwt = require("jsonwebtoken");
const RecipeModel = require("../models/RecipeModel");

// Create a new recipe
const createRecipe = async (req, res) => {
  try {
    const { token } = req.cookies;
    const deets = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const recipeDoc = await RecipeModel.create({
        owner: user._id,
        ...deets,
        kitchen: user.name, // populate the kitchen field with the user's name
      });
      res.json(recipeDoc);
    });
  } catch (error) {
    console.log(error);
  }
};

// Update a recipe
const updateRecipe = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { id } = req.params;
    const deets = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const recipeDoc = await RecipeModel.findOneAndUpdate(
        { _id: id, owner: user._id },
        deets,
        { new: true }
      );
      res.json(recipeDoc);
    });
  } catch (error) {
    console.log(error);
  }
};

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    res.json(await RecipeModel.find());
  } catch (error) {
    console.log(error);
  }
};

// get recipe by id
const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await RecipeModel.findById(id));
  } catch (error) {
    console.log(error);
  }
};

// get recipes by user id
const getRecipesByUserId = async (req, res) => {
  try {
    const { token } = req.cookies;

    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      res.json(await RecipeModel.find({ owner: user._id }));
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createRecipe,
  updateRecipe,
  getAllRecipes,
  getRecipeById,
  getRecipesByUserId,
};
