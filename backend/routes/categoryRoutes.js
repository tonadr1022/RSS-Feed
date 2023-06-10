import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} from "../controllers/categoriesController.js";

router
  .route("/")
  .get(protect, getCategories)
  .post(protect, createCategory)
  .patch(protect, updateCategory)
  .delete(protect, deleteCategory);

export default router;
