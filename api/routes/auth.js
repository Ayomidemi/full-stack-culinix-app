const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  getProfile,
  deleteUser,
  verifyEmail,
  resendVerificationEmail,
  updateUser,
} = require("../controllers/authController");

// Define routes
router.post("/register", signup);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification-email", resendVerificationEmail);
router.put("/update-user", updateUser);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", getProfile);
router.delete("/user/:id", deleteUser);

module.exports = router;
