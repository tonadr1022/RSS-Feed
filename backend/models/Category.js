import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  feeds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feed" }],
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
