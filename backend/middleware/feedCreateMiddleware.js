import Parser from "rss-parser";
const parser = new Parser();
import Feed from "../models/Feed.js";
import * as cheerio from "cheerio";

const feedCreateFromUrl = async (req, res, next) => {
  try {
    let { url, title, description } = req.body;
    // if no url, error
    if (!url) {
      res.status(400).json({ message: "Must provide a url" });
    }

    // add rss to reddit urls that don't
    if (url.includes("reddit") && !url.endsWith(".rss")) {
      url += url.endsWith("/") ? ".rss" : "/.rss";
      req.body.url = url;
    }
    console.log("url", url);

    // check if feed exists already
    const feedExists = await Feed.find({
      url: url,
      user: req.user,
    }).exec();
    // if exists, don't let it create
    if (feedExists.length > 0) {
      res.status(409);
      next(new Error("Duplicate Feed"));
    }

    // If youtube url, get the rss feed link from main channel page.
    if (url.includes("youtube")) {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);
      const canonicalUrl = $("link[rel='canonical']").attr("href");
      const channelId = canonicalUrl.split("/").slice(-1).pop();
      req.body.url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
      url = req.body.url;
      //  url = $("link[rel='alternate'][title='RSS']").attr("href");
    }

    try {
      // validate feed url
      const feed = await parser.parseURL(url);

      // attach feed data to the request
      req.body.title = title ? title : feed?.title;
      req.body.baseLink = feed?.link;
      req.body.description = description ? description : feed?.description;
      next();
    } catch (error) {
      console.log(error);
      res.status(400);
      next(new Error("Feed parse failed, bad URL"));
      //  res.status(400).json({ message: "Feed parse failed, bad URL" });
    }
  } catch (error) {
    console.log(error.stack);
    // handle feed parser errors
    next(error);
  }
};

export { feedCreateFromUrl };
