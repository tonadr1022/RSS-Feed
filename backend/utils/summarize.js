import { Configuration, OpenAIApi } from "openai";

const validateSize = (text) => text.length < 15000;

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
    console.log(inputText.length);
    if (!validateSize(inputText)) return "Cannot summarize, text is too long.";

    //   const textArr = splitText(inputText);
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const prompt = `Summarize the following text for an audience of adult news readers. Also, on one line at the beginning of the summary, indicate political bias:\n${inputText}`;
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],

      max_tokens: 1000,
      temperature: 0.3,
      n: 1,
    });

    const summaryResponse = response.data.choices[0].message.content;
    console.log(summaryResponse);

    return summaryResponse;
  } catch (err) {
    console.log(err);
    console.log(err?.response);
    console.log(err?.response?.data.error.message);
    throw err;
  }
};

export { summarize };
