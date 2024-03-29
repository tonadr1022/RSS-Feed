import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  createFeed,
  getFeeds,
  updateFeed,
  deleteFeed,
  getFeedContent,
  getOneFeedContent,
} from "../controllers/feedsController.js";
import { feedCreateFromUrl } from "../middleware/feedCreateMiddleware.js";

router
  .route("/")
  .post(protect, feedCreateFromUrl, createFeed)
  .get(protect, getFeeds)
  .patch(protect, updateFeed)
  .delete(protect, deleteFeed);
router.get("/content", protect, getFeedContent);
router.get("/content/:id", protect, getOneFeedContent);
router.get("/content/:categoryId", protect, getFeedContent);
export default router;
