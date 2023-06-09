import asyncHandler from "express-async-handler";
import Feed from "../models/Feed.js";
import Parser from "rss-parser";
const parser = new Parser();
// @desc Add new feed
// route POST /api/users/auth
// @access Private
const createFeed = asyncHandler(async (req, res) => {
  const { url, baseLink, title, category, description, isFavorite } = req.body;
  const feed = await Feed.create({
    url,
    baseLink,
    title,
    category,
    description,
    isFavorite,
    user: req.user,
  });

  if (feed) {
    res.status(201).json({
      _id: feed._id,
      url: url,
      category: category,
      title: title,
      description: description,
      baseLink: baseLink,
      isFavorite: isFavorite,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

// @desc Add new feed
// route POST /api/users/auth
// @access Private
const getFeeds = asyncHandler(async (req, res) => {
  const feeds = await Feed.find({ user: req.user }).exec();
  res.status(200).json(feeds);
});

// @desc Add new feed
// route POST /api/users/auth
// @access Private
const updateFeed = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "upd feeds" });
});

// @desc Add new feed
// route POST /api/users/auth
// @access Private
const deleteFeed = asyncHandler(async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ message: "Feed url required" });
  }

  const feed = await Feed.findOne({ url: url }).exec();
  if (!feed) {
    return res.status(400).json({ message: "Feed not found" });
  }
  if (feed.isFavorite === true) {
    return res.status(400).json({ message: "Cannot delete a favorite feed" });
  }

  const result = await feed.deleteOne();
  res.status(204).json();
});

const getFeedContent = asyncHandler(async (req, res) => {
  const user = req.user;
  const feeds = await Feed.find({ user: user._id }).exec();
  console.log(feeds);
  const feedContent = feeds.map((feed) => {
    const url = feed.url;
  });
  res.status(200).json({ message: "getting feed content" });
});

export { createFeed, getFeeds, updateFeed, deleteFeed, getFeedContent };
