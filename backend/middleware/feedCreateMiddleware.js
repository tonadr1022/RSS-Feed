import Parser from "rss-parser";
const parser = new Parser();
import Feed from "../models/Feed.js";
import * as cheerio from "cheerio";

const feedCreateFromUrl = async (req, res, next) => {
  try {
    let { url, title, description } = req.body;
    if (!url) {
      res.status(400).json({ message: "Must provide a url" });
    }
    const user = req.user;

    if (url.includes("reddit")) {
      url += url.endsWith("/") ? ".rss" : "/.rss";
      req.body.url = url;
    }

    // check if feed exists already
    const feedExists = await Feed.find({
      url: url,
      user: req.user,
    }).exec();

    if (feedExists.length > 0) {
      res.status(409);
      next(new Error("Duplicate Feed"));
    }

    let feed;
    // If youtube url, get the rss feed link from main channel page.
    if (url.includes("youtube")) {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);
      const xmlUrl = $("link[rel='alternate'][title='RSS']").attr("href");
      // validate feed can parse
      try {
        feed = await parser.parseURL(xmlUrl);
        // change req input url to xml url
        req.body.url = xmlUrl;
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Feed Parse Failed" });
      }
    } else {
      // validate feed can parse
      try {
        feed = await parser.parseURL(url);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Feed Parse Failed" });
      }
    }

    // attach feed data to the request
    req.body.title = title ? title : feed?.title;
    req.body.baseLink = feed?.link;
    req.body.description = description ? description : feed?.description;
    next();
  } catch (error) {
    console.log(error.stack);
    // handle feed parser errors
    next(error);
  }
};

export { feedCreateFromUrl };
