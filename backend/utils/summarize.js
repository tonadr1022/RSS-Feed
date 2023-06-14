import { Configuration, OpenAIApi } from "openai";
const splitText = (text) => {
  const chunkSize = 4000;
  const sentences = text.split(".");
  let chunks = [];
  let currentChunk = "";
  for (const sentence of sentences) {
    if (sentence.length + currentChunk.length < chunkSize) {
      currentChunk += sentence + ".";
    } else {
      chunks.push(currentChunk.trim());
      currentChunk = sentence + ".";
    }
  }
  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }
  return chunks;
};
const summarize = async (inputText) => {
  try {
    const textArr = splitText(inputText);
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const summaryArr = [];
    //  for (const text in textArr) {
    const prompt = `Summarize the following text for an audience of adult news readers. Also, on one line at the beginning of the summary, indicate political bias:\n${inputText}`;
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
      //  prompt,
      max_tokens: 1000,
      temperature: 0.3,
      n: 1,
    });
    // const summary = response.data.choices[0].message;
    const summary = response.data.choices[0].message.content;
    console.log(summary);
    summaryArr.push(summary);
    //   }
    return summary;
  } catch (err) {
    console.log(err);
    console.log(err?.response);
    console.log(err?.response?.data);
    throw err;
  }
};

export { summarize };
