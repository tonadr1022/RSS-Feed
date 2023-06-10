import asyncHandler from "express-async-handler";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import User from "../models/User.js";

// @desc Authorize user/set token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  // find user based on username
  const user = await User.findOne({ username });
  // if user found with username, check if they entered correct password
  // if so, generate new tokens and return the user
  if (user && (await user.matchPassword(password))) {
    generateRefreshToken(res, user._id);
    generateAccessToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

// @desc Register a new user
// route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    firstName,
    lastName,
    email,
    password,
  });

  if (user) {
    generateRefreshToken(res, user._id);
    generateAccessToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      username,
      firstName,
      lastName,
      email,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

// @desc Logout user
// route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  // empty cookies, set expiration to 0
  res.cookie("accessToken", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV !== "development", // site has to be https in production
    sameSite: "strict",
  });
  res.cookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV !== "development", // site has to be https in production
    sameSite: "strict",
  });
  res.status(200).json({ message: "User logged out" });
});

// @desc Get user profile
// route POST /api/users/logout
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    username: req.user.username,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
  };
  res.status(200).json(user);
});

// @desc Update user profile
// route POST /api/users/logout
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.username = req.body.username || user.username;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
    });
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
