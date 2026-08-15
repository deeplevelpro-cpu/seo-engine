import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },

    topic: {
      type: String,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

BlogSchema.virtual("displayTitle").get(function () {
  return this.title || this.topic || "Untitled Article";
});

export default mongoose.models.Blog ||
  mongoose.model("Blog", BlogSchema);
