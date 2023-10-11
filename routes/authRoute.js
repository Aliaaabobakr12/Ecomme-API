const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const {
  register,
  login,
  verifyEmail,
  logout,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.delete("/logout", authenticateUser, logout);

module.exports = router;
