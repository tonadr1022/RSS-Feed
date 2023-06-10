import express from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
const app = express();
import { logger, logEvents } from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser"; // learning
import connectDB from "./config/dbConn.js";
import mongoose from "mongoose";
const PORT = process.env.PORT || 3500;
import userRoutes from "./routes/userRoutes.js";
import feedRoutes from "./routes/feedRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

console.log(`Running on ${process.env.NODE_ENV} mode`);

connectDB();

app.use(logger);

// parse json middleware
app.use(express.json());
// accept form data middleware
app.use(express.urlencoded({ extended: true }));
// cookie parser middleware
app.use(cookieParser());

// static files
//app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.use("/api/users", userRoutes);
app.use("/api/feeds", feedRoutes);
app.use("/api/categories", categoryRoutes);

// if production mode, set CWD, use static files from static build
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend", "dist")));
  // catch all requests that aren't to api
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist"))
  );
} else {
  app.get("/", (req, res) => res.send("Server is ready"));
}

app.use(notFound);
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// mongo db error logging
mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
