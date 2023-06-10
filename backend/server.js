import express from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
const app = express();
import { logger, logEvents } from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser"; // learning
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import connectDB from "./config/dbConn.js";
import mongoose from "mongoose";
const PORT = process.env.PORT || 3500;
import userRoutes from "./routes/userRoutes.js";
import feedRoutes from "./routes/feedRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

console.log(`Running on ${process.env.NODE_ENV} mode`);

connectDB();

app.use(logger);

app.use(cors(corsOptions));

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

// if production mode, set CWD, use static files from static build, and catch all requests that aren't to api
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend", "dist")));
  app.get("*");
}

app.get("/", (req, res) => res.send("Server is ready"));
// // all routes that aren't valid
// app.all("*", (req, res) => {
//   res.status(404);
//   // if req accepts html, send html 404 page. If json, send 404 json, otherwise txt 404
//   if (req.accepts("html")) {
//     res.sendFile(path.join(__dirname, "views", "404.html"));
//   } else if (req.accepts("json")) {
//     res.json({ message: "404 Not Found" });
//   } else {
//     res.type("txt").send("404 not found");
//   }
// });
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
