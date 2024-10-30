const jwt = require("jsonwebtoken");
const RecipeModel = require("../models/RecipeModel");

// Create a new recipe
const createRecipe = async (req, res) => {
  try {
    const { token } = req.cookies;
    const deets = req.body;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;

      const recipeDoc = await RecipeModel.create({
        owner: user.id,
        ...deets,
        kitchen: {
          name: user.name,
          email: user.email,
        },
      });

      res.json({
        status: true,
        message: "Recipe created successfully",
        recipeDoc,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while creating recipe",
    });
  }
};

// Update a recipe
const updateRecipe = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { id } = req.params;
    const deets = req.body;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;
      const recipeDoc = await RecipeModel.findOneAndUpdate(
        { id: id, owner: user.id },
        deets,
        { new: true }
      );
      res.json(recipeDoc);
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while updating this recipe",
    });
  }
};

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModel.find();

    res.json({
      status: true,
      message: "Recipes fetched successfully",
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while fetching recipes",
    });
  }
};

// get recipe by id
const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await RecipeModel.findById(id);

    res.json({
      status: true,
      message: "Recipe fetched successfully",
      recipe,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while fetching this recipe",
    });
  }
};

// get recipes by user id
const getUserRecipes = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { page = 1, limit = 10, search = "" } = req.query;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;

      const searchQuery = {
        owner: user.id,
        $or: [
          { name: { $regex: search, $options: "i" } },
          { category: { $elemMatch: { $regex: search, $options: "i" } } },
          { ingredients: { $elemMatch: { $regex: search, $options: "i" } } },
        ],
      };

      const totalRecipes = await RecipeModel.countDocuments(searchQuery);

      const recipes = await RecipeModel.find(searchQuery)
        .skip((page - 1) * limit)
        .limit(Number(limit));

      res.json({
        status: true,
        message: "Recipes fetched successfully",
        total: Math.ceil(totalRecipes / limit),
        data: recipes,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "An error occurred while fetching recipes",
    });
  }
};

module.exports = {
  createRecipe,
  updateRecipe,
  getAllRecipes,
  getRecipeById,
  getUserRecipes,
};
