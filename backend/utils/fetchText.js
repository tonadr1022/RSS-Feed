import * as cheerio from "cheerio";
import fs from "fs";
const fetchText = async (url) => {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const paragraphs = [];
  let pString = "";
  $("article")
    .find("p")
    .each((index, element) => {
      const paragraphText = $(element).text();
      if (!paragraphText.includes("Supported By")) {
        paragraphs.push(paragraphText);
        pString += paragraphText;
      }
    });
  // const rawBody = html.split(/<body.*>/)[1];
  // fs.writeFileSync("rawhtml.txt", rawBody);
  const charLength = pString.length;
  const wordLength = pString.split(" ").length;

  return { paragraphs, pString, charLength, wordLength };
};

export default fetchText;
