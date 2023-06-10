import jwt from "jsonwebtoken";

const generateAccessToken = (res, userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // site has to be https in production
    sameSite: "strict",
    maxAge: 5 * 60 * 1000,
  });
};

export default generateAccessToken;
