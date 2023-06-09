import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  createFeed,
  getFeeds,
  updateFeed,
  deleteFeed,
  getFeedContent,
} from "../controllers/feedsController.js";
import { feedCreateMiddleware } from "../middleware/feedParserMiddleware.js";
router
  .route("/")
  .post(protect, feedCreateMiddleware, createFeed)
  .get(protect, getFeeds)
  .patch(protect, updateFeed)
  .delete(protect, deleteFeed);

router.get("/content", protect, getFeedContent);
export default router;
