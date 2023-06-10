import asyncHandler from "express-async-handler";
import Feed from "../models/Feed.js";
import Parser from "rss-parser";
import Category from "../models/Category.js";
import sortFeedContent from "../utils/sortFeedContent.js";
import Article from "../models/Article.js";
const parser = new Parser();

// @desc Get All feeds
// route GET /api/feeds
// @access Private
const getFeeds = asyncHandler(async (req, res) => {
  const feeds = await Feed.find({ user: req.user }).populate("category").exec();
  res.status(200).json(feeds);
});

// @desc Add new feed
// route POST /api/feeds
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
  const cat = await Category.findById(category);
  if (!cat?.feeds.includes(feed._id)) {
    cat.feeds.push(feed._id);
    cat.save();
  }
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

// @desc Update a feed
// route PATCH /api/feeds
// @access Private
const updateFeed = asyncHandler(async (req, res) => {
  const { _id, category, title, description, isFavorite } = req.body;
  console.log(_id);
  const cat = await Category.findById(category);
  if (!cat?.feeds.includes(_id)) {
    cat.feeds.push(_id);
    cat.save();
  }
  const feed = await Feed.findOneAndUpdate(
    { _id: _id },
    {
      category: category,
      title: title,
      description: description,
      isFavorite: isFavorite,
    },
    { new: true }
  );
  if (feed) {
    res.json({ message: `${feed.title} updated` });
  } else {
    res.status(400).json({ message: "Category not found" });
  }
});

// @desc Delete a feed
// route DELETE /api/feeds
// @access Private
const deleteFeed = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log(id, req.body);
  if (!id) {
    return res.status(400).json({ message: "Feed ID required" });
  }
  const feed = await Feed.findById({ _id: id }).exec();
  if (!feed) {
    return res.status(400).json({ message: "Feed not found" });
  } else if (feed.isFavorite === true) {
    res.status(400).json({ message: "Cannot delete a favorite feed" });
  } else {
    await feed.deleteOne();
    res.status(204).json();
  }
});

// @desc Get favorite feeds content
// route GET /api/feeds/content
// @access Private
const getFeedContent = asyncHandler(async (req, res) => {
  const { categoryId } = req.query;
  let category;
  let feeds;

  if (categoryId) {
    category = await Category.findById(categoryId).exec();
    feeds = await Feed.find({
      user: req.user,
      category: categoryId,
    }).exec();
  } else {
    feeds = await Feed.find({ user: req.user, isFavorite: true }).exec();
  }
  const allFeedsContent = [];
  const feedTitles = [];
  for (const feed of feeds) {
    feedTitles.push(feed.title);
    try {
      const feedContentRaw = await parser.parseURL(feed.url);
      for (const item of feedContentRaw.items) {
        if (!item.pubDate) continue;
        const link = item?.link || item?.guid;
        allFeedsContent.push({
          feedTitle: feed.title,
          title: item.title,
          link: link,
          pubDate: item.pubDate,
          isoDate: item.isoDate,
        });
      }
      // const feedContentObj = {
      //   id: feed._id,
      //   title: feed.title,
      //   content: feedContent,
      // };

      //   allFeedsContent.push(feedContentObj);
    } catch (err) {
      console.log(err);
      res.status(500);
      throw new Error("Failed getting content");
    }
  }
  const sortedContent = sortFeedContent(allFeedsContent);

  if (category) {
    res.status(200).json({ [category.name]: sortedContent });
  } else {
    res
      .status(200)
      .json({ feedTitles: feedTitles, sortedContent: sortedContent });
  }
});

const getOneFeedContent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const feed = await Feed.findById(id);
  // const userFullName = req.user.firstName + " " + req.user.lastName;
  // const userUsername = req.user.username;
  if (feed) {
    const feedContentRaw = await parser.parseURL(feed.url);
    const feedContent = [];
    for (const item of feedContentRaw.items) {
      if (!item.pubDate) continue;
      const link = item?.link || item?.guid;
      feedContent.push({
        title: item.title,
        link: link,
        pubDate: item.pubDate,
        isoDate: item.isoDate,
      });

      // // save article to db for collection
      // const existing = await Article.findOne({ url: link }).exec();
      // if (!existing) {
      //   const article = {
      //     url: link,
      //     title: item.title,
      //     isoDate: new Date(item.isoDate),
      //     userFullName: userFullName,
      //     userUsername: userUsername,
      //   };
      //   await Article.create(article);
      // }
    }
    const sortedContent = sortFeedContent(feedContent);
    res.json({ [feed.title]: sortedContent });
  } else {
    res.status(400);
    throw new Error("invalid feed id");
  }
});

export {
  createFeed,
  getFeeds,
  updateFeed,
  deleteFeed,
  getFeedContent,
  getOneFeedContent,
};
