const jwt = require("jsonwebtoken");
const ReviewsModel = require("../models/ReviewsModel");

// Create a new review
const createReview = async (req, res) => {
  try {
    const { token } = req.cookies;
    const comment = req.body;
    const { recipeId } = req.params;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;

      const reviewDoc = await ReviewsModel.create({
        userId: user.id,
        recipeId,
        reviewer: user.name,
        ...comment,
      });

      await reviewDoc.save();

      res.json({
        status: true,
        message: "Review created successfully",
        data: {
          reviewer: user.name,
          review: reviewDoc.review,
          createdAt: reviewDoc.createdAt,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while creating review",
    });
  }
};

// get all reviews for a recipe
const getReviews = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { recipeId } = req.params;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;

      const reviews = await ReviewsModel.find({ recipeId });

      res.json({
        status: true,
        data: reviews,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while getting reviews",
    });
  }
};

// delete review by id
const deleteReview = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { recipeId } = req.params;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;

      const review = await ReviewsModel.findOne({ recipeId });

      if (!review) {
        return res.status(404).json({
          status: false,
          message: "Review not found",
        });
      }

      if (review.userId.toString() !== user.id.toString()) {
        return res.status(403).json({
          status: false,
          message: "You are not authorized to delete this review",
        });
      }

      await review.deleteOne();

      res.json({
        status: true,
        message: "Review deleted successfully",
      });
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while getting reviews",
    });
  }
};

module.exports = {
  createReview,
  getReviews,
  deleteReview,
};
