import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  getArticleText,
  summarizeArticleContent,
} from "../controllers/articleController.js";

router.post("/", protect, getArticleText);
router.post("/summarize", protect, summarizeArticleContent);

export default router;
