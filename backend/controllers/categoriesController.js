import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";

// @desc Get All categories
// route GET /api/categories
// @access Private
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ user: req.user })
    .populate("feeds")
    .exec();
  res.status(200).json(categories);
});

// @desc Add new category
// route POST /api/categories
// @access Private
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.create({ name, user: req.user });
  console.log(category);

  if (category) {
    res.status(201).json({ _id: category._id, name: category.name });
  } else {
    res.status(400);
    throw new Error("Uh Ohh");
  }
});

// @desc Update category
// route PATCH /api/categories
// @access Private
const updateCategory = asyncHandler(async (req, res) => {
  const { _id, name } = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: _id },
    { name: name },
    { new: true }
  );
  if (category) {
    res.json({ message: `${category.name} updated` });
  } else {
    res.status(400).json({ message: "Category not found" });
  }
});

// @desc Delete category
// route DELETE /api/categories
// @access Private
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log(id, "id");
  if (!id) {
    return res.status(400).json({ message: "Category id required" });
  }

  const category = await Category.findById({ _id: id }).exec();
  if (!category) {
    return res.status(400).json({ message: "Category not found" });
  }
  await category.deleteOne();
  res.status(204).json();
});

export { createCategory, updateCategory, deleteCategory, getCategories };
