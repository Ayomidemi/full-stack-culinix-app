const express = require("express");
const router = express.Router();

const {
  createReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");

// Define routes
router.post("/:recipeId/create-review", createReview);
router.get("/:recipeId/reviews", getReviews);
router.delete("/:recipeId/delete-review", deleteReview);

module.exports = router;
