const jwt = require("jsonwebtoken");
const RecipeModel = require("../models/RecipeModel");
const FavoritesModel = require("../models/FavoritesModel");
const LikesModel = require("../models/LikesModel");

// utility function for likes and dislikes
const getLikesDislikesForRecipe = async (recipeId, userId) => {
  const likes = await LikesModel.countDocuments({ recipeId, like: true });
  const dislikes = await LikesModel.countDocuments({ recipeId, dislike: true });

  if (!userId) {
    return { likes, dislikes, liked: false, disliked: false };
  }

  const likedByMe = await LikesModel.findOne({ recipeId, userId });

  const liked = likedByMe?.like || false;
  const disliked = likedByMe?.dislike || false;

  return { likes, dislikes, liked, disliked };
};

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
    const { token } = req.cookies;
    let userId = null;

    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        userId = user.id;
      } catch (err) {
        console.log("Invalid token:", err);
      }
    }

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

    const streamRecipes = await Promise.all(
      recipes.map(async (recipee) => {
        const { likes, dislikes, liked, disliked } =
          await getLikesDislikesForRecipe(recipee._id, userId);
        return {
          _id: recipee._id,
          kitchen: {
            name: recipee.kitchen.name,
            email: recipee.kitchen.email,
          },
          name: recipee.name,
          desc: recipee.desc,
          _id: recipee._id,
          imageUrl: recipee.imageUrl,
          likes,
          dislikes,
          liked,
          disliked,
          views: recipee.views,
          createdAt: recipee.createdAt,
          isFavorite: recipee.isFavorite,
        };
      })
    );

    res.json({
      status: true,
      message: "Recipes fetched successfully",
      data: streamRecipes,
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
    const { token } = req.cookies;
    let userId = null;

    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        userId = user.id;
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

    // likes and dislikes
    const { likes, dislikes, liked, disliked } =
      await getLikesDislikesForRecipe(id, userId);

    res.json({
      status: true,
      message: "Recipe fetched successfully",
      data: {
        ...recipe.toObject(),
        isFavorite,
        likes,
        dislikes,
        liked,
        disliked,
      },
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

      const streamRecipes = await Promise.all(
        recipes.map(async (recipee) => {
          const { likes, dislikes, liked, disliked } =
            await getLikesDislikesForRecipe(recipee._id, user.id);
          return {
            _id: recipee._id,
            kitchen: {
              name: recipee.kitchen.name,
              email: recipee.kitchen.email,
            },
            name: recipee.name,
            desc: recipee.desc,
            _id: recipee._id,
            imageUrl: recipee.imageUrl,
            likes,
            dislikes,
            liked,
            disliked,
            views: recipee.views,
            createdAt: recipee.createdAt,
            isFavorite: recipee.isFavorite,
          };
        })
      );

      res.json({
        status: true,
        message: "Recipes fetched successfully",
        total: Math.ceil(totalRecipes / limit),
        data: streamRecipes,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while fetching recipes",
    });
  }
};

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

// liked and disliked recipe users list
const likeDislikeRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const { type } = req.body;
  const { token } = req.cookies;

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized. Invalid token.",
      });
    }

    const userId = user.id;

    try {
      // check for enum type
      if (!["like", "dislike"].includes(type)) {
        return res.status(400).json({
          status: false,
          message: "Invalid type. Must be either 'like' or 'dislike'",
        });
      }

      let liked = await LikesModel.findOne({ userId, recipeId });

      if (!liked) {
        liked = new LikesModel({
          userId,
          recipeId,
          like: type === "like",
          dislike: type === "dislike",
        });
      } else {
        if (type === "like") {
          liked.like = !liked.like;
          if (liked.like) liked.dislike = false;
        } else if (type === "dislike") {
          liked.dislike = !liked.dislike;
          if (liked.dislike) liked.like = false;
        }
      }

      await liked.save();

      res.json({
        status: true,
        message: `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } status updated`,
        data: liked,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "An error occurred while updating like/dislike status",
      });
    }
  });
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

      const streamlinedFavorites = await Promise.all(
        favorites.map(async (favorite) => {
          const { likes, dislikes } = await getLikesDislikesForRecipe(
            favorite.recipeId._id
          );
          return {
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
              likes,
              dislikes,
              views: favorite.recipeId.views,
              createdAt: favorite.recipeId.createdAt,
              isFavorite: true,
            },
          };
        })
      );

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
  likeDislikeRecipe,
  addRemoveFavorite,
  getFavorites,
};
