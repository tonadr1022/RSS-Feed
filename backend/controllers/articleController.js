import asyncHandler from "express-async-handler";
import fetchText from "../utils/fetchText.js";
import { summarize } from "../utils/summarize.js";

const getArticleText = asyncHandler(async (req, res) => {
  const url = req.body.url;
  const { paragraphs, pString, charLength, wordLength } = await fetchText(url);
  return res.json({
    article: paragraphs,
    pString,
    charLength,
    wordLength,
  });
});

const summarizeArticleContent = asyncHandler(async (req, res) => {
  const url = req.body.url;
  const pString = req.body.pString;
  //  const paragraphs = await fetchText(url);
  //  let p2s = "";
  //  for (const paragraph of paragraphs) {
  //    p2s += paragraph;
  //  }
  const summarizedText = await summarize(pString);
  return res.json({ summary: summarizedText });
});

export { getArticleText, summarizeArticleContent };
