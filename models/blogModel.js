const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter your blog's title"],
      maxLength: [60, "Please keep your blog's title under 60 characters"],
      trim: true,
    },
    body: {
      type: String,
      required: [true, "Please enter your blog's body"],
    },
    images: {
      type: [String],
    },
    upVote: {
      type: Number,
    },
    upVoteUsers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    downVote: {
      type: Number,
    },
    downVoteUsers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
