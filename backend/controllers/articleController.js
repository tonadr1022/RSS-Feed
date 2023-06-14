import asyncHandler from "express-async-handler";
import fetchText from "../utils/fetchText.js";
import { summarize } from "../utils/summarize.js";
//import fs from "fs";

const getArticleText = asyncHandler(async (req, res) => {
  const url = req.body.url;
  const { paragraphs, pString } = await fetchText(url);
  return res.json({ article: paragraphs, pString: pString });
});

const summarizeArticleContent = asyncHandler(async (req, res) => {
  const url = req.body.url;
  const pString = req.body.pString;
  //  const paragraphs = await fetchText(url);
  //  let p2s = "";
  //  for (const paragraph of paragraphs) {
  //    p2s += paragraph;
  //  }
  const summarized = await summarize(pString);
  return res.json({ summary: summarized });
  // console.log("p2s", p2s);
  //  console.log("pstring", pString);
  return res.json({ summary: pString });
});

export { getArticleText, summarizeArticleContent };
