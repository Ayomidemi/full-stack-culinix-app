const express = require("express");
const router = express.Router();

const {
  createReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");

// Define routes
router.post("/:id/create-review", createReview);
router.get("/:id/reviews", getReviews);
router.delete("/:id/delete-review", deleteReview);

module.exports = router;
