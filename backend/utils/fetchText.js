import * as cheerio from "cheerio";

const fetchText = async (url) => {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const paragraphs = [];
  let pString = "";
  $("p").each((index, element) => {
    const paragraphText = $(element).text();
    paragraphs.push(paragraphText);
    pString += paragraphText;
  });

  return { paragraphs: paragraphs, pString: pString };
};

export default fetchText;
