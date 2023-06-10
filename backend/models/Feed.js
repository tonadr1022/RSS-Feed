import mongoose from "mongoose";
//const AutoIncrement = require("mongoose-sequence")(mongoose);

const feedSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    baseLink: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    description: { type: String },
    isFavorite: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true, // created and updated at
  }
);

const Feed = mongoose.model("Feed", feedSchema);
export default Feed;
