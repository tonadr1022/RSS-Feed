import asyncHandler from "express-async-handler";
import Feed from "../models/Feed.js";
import Parser from "rss-parser";
const parser = new Parser();

// @desc Get All feeds
// route GET /api/feeds
// @access Private
const getFeeds = asyncHandler(async (req, res) => {
  const feeds = await Feed.find({ user: req.user }).exec();
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
  console.log(feed);

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
    return res.status(400).json({ message: "Feed id required" });
  }

  const feed = await Feed.findById({ _id: id }).exec();
  if (!feed) {
    return res.status(400).json({ message: "Feed not found" });
  }
  if (feed.isFavorite === true) {
    return res.status(400).json({ message: "Cannot delete a favorite feed" });
  }

  await feed.deleteOne();
  res.status(204).json();
});

const getFeedContent = asyncHandler(async (req, res) => {
  const user = req.user;
  const feeds = await Feed.find({ user: user._id }).exec();

  const allFeedsContent = [];
  for (const feed of feeds) {
    try {
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
      }
      const feedContentObj = {
        id: feed._id,
        title: feed.title,
        content: feedContent,
      };
      allFeedsContent.push(feedContentObj);
      // console.log(feedContent.items);
      // for (const item of feedContent.items) {
      //   if (!item.pubDate) continue;
      //   const link = item?.link || item?.guid;
      //   totalContent.push({
      //     feedTitle: feed.title,
      //     title: item.title,
      //     link: link,
      //     pubDate: item.pubDate,
      //     isoDate: item.isoDate,
      //   });
      //   //    totalContent.push(item.isoDate)
      // }
    } catch (err) {
      console.log(err);
      res.status(500);
      throw new Error("Failed getting content");
    }
  }
  // console.log(totalContent);
  // const content = totalContent.sort(
  //   (item1, item2) =>
  //     new Date(item2.isoDate).getTime() - new Date(item1.isoDate).getTime()
  // );

  // console.log(totalContent);
  res.status(200).json(allFeedsContent);
});

const getOneFeedContent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const feed = await Feed.findById(id);
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
    }
    res.json({ [feed.title]: feedContent });
  } else {
    res.status(400);
    throw new Error("invalid user data");
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
