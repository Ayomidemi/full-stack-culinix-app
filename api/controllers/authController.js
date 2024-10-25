const UserModel = require("../models/UserModel");
const { hashPassword, comparePassword } = require("../config/helpers/auth");
const jwt = require("jsonwebtoken");

// Signup controller
const signup = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    // Check if the user exists
    if (!name || !email || !phoneNumber || !password) {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials!",
      });
    }

    // Check if the password is good
    if (!password || password.length < 6) {
      return res.status(400).json({
        status: false,
        message: "Password is required and should be at least 6 characters!",
      });
    }

    // check if the email is valid
    const exist = await UserModel.findOne({ email }).lean();
    if (exist) {
      return res.status(400).json({
        status: false,
        message: "Email already exists!",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await UserModel.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    return res.status(201).json({
      status: true,
      message: "Account created successfully!",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

// Login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if the email is valid
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "No user found!",
      });
    }

    // check if passwords match
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(422).json({
        status: false,
        message: "Invalid password!",
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    res
      .cookie("token", token, { httpOnly: true, maxAge: 10 * 60 * 60 * 1000 }) // 10 hours
      .json({
        status: true,
        message: "Login successful!",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
        // token,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: false, message: "An error occurred during login" });
  }
};

// get profile controller
const getProfile = async (req, res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expired" });
        }
        return res.status(403).json({ message: "Unauthorized" });
      }

      const { name, email, _id } = await UserModel.findById(userData.id);
      res.json({ name, email, _id });
    });
  } catch (error) {
    console.log(error);
  }
};

// Logout controller
const logout = async (req, res) => {
  try {
    res.clearCookie("token").json({ message: "Logged out successfully!" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  getProfile,
};
