import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  isoDate: { type: Date },
  userFullName: { type: String, required: true },
  userUsername: { type: String, required: true },
});

const Article = mongoose.model("Article", articleSchema);
export default Article;
