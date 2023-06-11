import asyncHandler from "express-async-handler";
import * as cheerio from "cheerio";

const getArticleText = asyncHandler(async (req, res) => {
  console.log(req.body.url);
  const url = req.body.url;
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const paragraphs = [];
  $("p").each((index, element) => {
    const paragraphText = $(element).text();
    paragraphs.push(paragraphText);
  });

  return res.json({ article: paragraphs, raw: $ });
});

export { getArticleText };
