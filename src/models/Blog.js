import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  slug: String,
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
