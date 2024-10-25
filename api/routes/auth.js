const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  getProfile,
  deleteUser,
} = require("../controllers/authController");

// Define routes
router.post("/register", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", getProfile);
router.delete("/user/:id", deleteUser);

module.exports = router;
