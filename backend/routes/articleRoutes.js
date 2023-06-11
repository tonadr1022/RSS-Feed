import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { getArticleText } from "../controllers/articleController.js";

router.post("/", protect, getArticleText);

export default router;
