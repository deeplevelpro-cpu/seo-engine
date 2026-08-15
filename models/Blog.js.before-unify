import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  topic: String,
  slug: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
