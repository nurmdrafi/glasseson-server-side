const mongoose = require("mongoose");

const commentModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
      required: true,
    },
    loveCount: {
      type: Number,
    },
    loveVoters: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentModel);
