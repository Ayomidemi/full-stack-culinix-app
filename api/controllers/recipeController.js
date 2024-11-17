const jwt = require("jsonwebtoken");
const RecipeModel = require("../models/RecipeModel");
const FavoritesModel = require("../models/FavoritesModel");

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
        data: recipeDoc,
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
        { _id: id, owner: user.id },
        {
          ...deets,
          kitchen: {
            name: user.name,
            email: user.email,
          },
        },
        { new: true }
      );

      res.json({
        status: true,
        message: "Recipe updated successfully",
        data: recipeDoc,
      });
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
    const { page = 1, limit = 10, search = "" } = req.query;

    const searchQuery = {
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
      data: recipes,
      total: Math.ceil(totalRecipes / limit),
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
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    let userId = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (err) {
        console.log("Invalid token:", err);
      }
    }

    // fetch recipe and increase views by 1
    const recipe = await RecipeModel.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true } // returns updated document
    );

    if (!recipe) {
      return res.status(404).json({
        status: false,
        message: "Recipe not found!",
      });
    }

    // favorites
    let isFavorite = false;

    if (userId) {
      const favorite = await FavoritesModel.findOne({
        userId,
        recipeId: id,
      });
      isFavorite = !!favorite;
    }

    // Check for like/dislike status if user ID is available
    const liked = userId ? recipe.likedBy.includes(userId) : false;
    const disliked = userId ? recipe.dislikedBy.includes(userId) : false;

    res.json({
      status: true,
      message: "Recipe fetched successfully",
      data: { ...recipe.toObject(), liked, disliked, isFavorite },
    });
  } catch (error) {
    console.log(error);
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

// delete recipe by id
const deleteRecipe = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { id } = req.params;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;

      await RecipeModel.findOneAndDelete({ _id: id, owner: user.id });

      res.json({
        status: true,
        message: "Recipe deleted successfully",
      });
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while deleting this recipe",
    });
  }
};

// liked recipe users list
const likeRecipeByUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const recipe = await RecipeModel.findById(id);

    if (!recipe) {
      return res
        .status(404)
        .json({ status: false, message: "Recipe not found" });
    }

    // Check if user has already liked the recipe
    const likedIndex = recipe.likedBy.indexOf(userId);
    const dislikedIndex = recipe.dislikedBy.indexOf(userId);

    if (likedIndex === -1) {
      // Add like
      recipe.likedBy.push(userId);
      recipe.likes += 1;

      // Remove dislike if present
      if (dislikedIndex !== -1) {
        recipe.dislikedBy.splice(dislikedIndex, 1);
        recipe.dislikes -= 1;
      }
    } else {
      // Remove like if already liked
      recipe.likedBy.splice(likedIndex, 1);
      recipe.likes -= 1;
    }

    await recipe.save();

    res.json({ status: true, message: "Like status updated", data: recipe });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while updating like status",
    });
  }
};

// disliked recipe users list
const dislikeRecipeByUsers = async (req, res) => {
  try {
    const { id } = req.params; // Recipe ID
    const { userId } = req.body; // User ID of the person disliking the recipe

    const recipe = await RecipeModel.findById(id);

    if (!recipe) {
      return res
        .status(404)
        .json({ status: false, message: "Recipe not found!" });
    }

    // Check if user has already disliked the recipe
    const dislikedIndex = recipe.dislikedBy.indexOf(userId);
    const likedIndex = recipe.likedBy.indexOf(userId);

    if (dislikedIndex === -1) {
      // Add dislike
      recipe.dislikedBy.push(userId);
      recipe.dislikes += 1;

      // Remove like if present
      if (likedIndex !== -1) {
        recipe.likedBy.splice(likedIndex, 1);
        recipe.likes -= 1;
      }
    } else {
      // Remove dislike if already disliked
      recipe.dislikedBy.splice(dislikedIndex, 1);
      recipe.dislikes -= 1;
    }

    await recipe.save();

    res.json({ status: true, message: "Dislike status updated", data: recipe });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while updating dislike status",
    });
  }
};

// favorite recipe by users
const addRemoveFavorite = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { recipeId } = req.params;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;

      // check for if favorite exists
      const existingFavorite = await FavoritesModel.findOne({
        userId: user.id,
        recipeId,
      });

      if (existingFavorite) {
        await existingFavorite.deleteOne();
        return res.json({
          status: true,
          message: "Recipe removed from favorites",
        });
      } else {
        await FavoritesModel.create({
          userId: user.id,
          recipeId,
        });

        return res.json({
          status: true,
          message: "Recipe added to favorites",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while updating favorites",
    });
  }
};

// get all favorites by user
const getFavorites = async (req, res) => {
  try {
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;

      const favorites = await FavoritesModel.find({ userId: user.id }).populate(
        "recipeId"
      );

      const streamlinedFavorites = favorites.map((favorite) => ({
        _id: favorite._id,
        recipe: {
          kitchen: {
            name: favorite.recipeId.kitchen.name,
            email: favorite.recipeId.kitchen.email,
          },
          name: favorite.recipeId.name,
          desc: favorite.recipeId.desc,
          _id: favorite.recipeId._id,
          imageUrl: favorite.recipeId.imageUrl,
          likes: favorite.recipeId.likes,
          dislikes: favorite.recipeId.dislikes,
          views: favorite.recipeId.views,
          createdAt: favorite.recipeId.createdAt,
          isFavorite: true,
        },
      }));

      res.json({
        status: true,
        data: streamlinedFavorites,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while fetching favorites",
    });
  }
};

module.exports = {
  createRecipe,
  updateRecipe,
  getAllRecipes,
  getRecipeById,
  getUserRecipes,
  deleteRecipe,
  likeRecipeByUsers,
  dislikeRecipeByUsers,
  addRemoveFavorite,
  getFavorites,
};
