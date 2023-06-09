import Parser from "rss-parser";
const parser = new Parser();
import Feed from "../models/Feed.js";

const feedCreateMiddleware = async (req, res, next) => {
  try {
    const { url, title, description } = req.body;
    console.log("req body", req.body);
    if (!url) {
      res.status(400).json({ message: "Must provide a url" });
    }
    const user = req.body.user;
    // check if feed exists already
    const feedExists = await Feed.findOne({ url, user });
    if (feedExists) {
      res.status(409);
      next(new Error("Duplicate feed url"));
    }
    const feed = await parser.parseURL(url);
    // attach feed data to the request
    req.body.title = title ? title : feed.title;
    req.body.baseLink = feed.link;
    req.body.description = description ? description : feed.description;
    next();
  } catch (error) {
    console.log(error.stack);
    // handle feed parser errors
    next(error);
  }
};

export { feedCreateMiddleware };
