const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserModel = require("../models/UserModel");
const { hashPassword, comparePassword } = require("../config/helpers/auth");
const { sendVerificationMail } = require("../utils/email-verification");

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
    const emailToken = crypto.randomBytes(64).toString("hex");

    const user = await UserModel.create({
      name,
      email,
      phoneNumber,
      emailToken,
      password: hashedPassword,
    });

    sendVerificationMail(user);

    return res.status(201).json({
      status: true,
      message: "Account created successfully!",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        verified: user.verified,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while deleting the account",
    });
  }
};

// Verify email controller
const verifyEmail = async (req, res) => {
  try {
    const { emailToken } = req.body;

    if (!emailToken) {
      return res.status(400).json({
        status: false,
        message: "Invalid token!",
      });
    }

    const user = await UserModel.findOne({ emailToken });

    if (!user) {
      return res.json({
        status: false,
        message: "Email verification failed. Invalid token!",
      });
    } else {
      user.verified = true;
      user.emailToken = null;

      await user.save();

      const token = jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "10h" }
      );

      return res
        .cookie("token", token, { httpOnly: true, maxAge: 10 * 60 * 60 * 1000 })
        .json({
          status: true,
          message: "Email verified successfully!",
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            verified: user.verified,
            createdAt: user.createdAt,
          },
          // token,
        });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while verifying the email",
    });
  }
};

// resend verification email controller
const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: false,
        message: "Invalid email!",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({
        status: false,
        message: "Email verification failed. Invalid email!",
      });
    } else {
      sendVerificationMail(user);

      return res.json({
        status: true,
        message: "Email verification sent successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while resending the email",
    });
  }
};

// update user controller
const updateUser = async (req, res) => {
  try {
    const deets = req.body;
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ status: false, message: "Token expired" });
        }
        return res.status(403).json({ status: false, message: "Unauthorized" });
      }

      const user = await UserModel.findById(decoded.id);
      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      } else {
        user.set(deets);
        user.save();
      }

      res.json({
        status: true,
        message: "User updated successfully!",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          verified: user.verified,
          phoneNumber: user.phoneNumber,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          __v: user.__v,
        },
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "An error occurred while updating the user",
    });
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
          verified: user.verified,
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

// Get profile controller
const getProfile = async (req, res) => {
  try {
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ status: false, message: "Token expired" });
        }
        return res.status(403).json({ status: false, message: "Unauthorized" });
      }

      const user = await UserModel.findById(decoded.id).lean();
      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: "User not found" });
      }

      res.json({
        status: true,
        message: "Profile fetched successfully!",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          verified: user.verified,
          phoneNumber: user.phoneNumber,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          __v: user.__v,
        },
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "An error occurred while fetching the profile",
    });
  }
};

// Logout controller
const logout = async (req, res) => {
  try {
    res
      .clearCookie("token")
      .json({ status: true, message: "Logged out successfully!" });
  } catch (error) {
    console.log(error);
  }
};

// Delete user controller
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    return res.clearCookie("token").json({
      status: true,
      message: "User account deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "An error occurred while deleting the account",
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
  getProfile,
  deleteUser,
  verifyEmail,
  resendVerificationEmail,
  updateUser,
};
