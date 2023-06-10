import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateAccessToken from "../utils/generateAccessToken.js";

// protects routes, must be logged in to access
const protect = asyncHandler(async (req, res, next) => {
  console.log("req cookies", req.cookies);
  let accessToken;
  accessToken = req.cookies.accessToken;
  let refreshToken;
  refreshToken = req.cookies.refreshToken;

  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid access token");
    }
  } else if (refreshToken) {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    generateAccessToken(res, req.user._id);
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
