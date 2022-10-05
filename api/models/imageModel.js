const mongoose = require("mongoose");

const imageModel = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [product, blog],
  },
});

module.exports = mongoose.model("Image", imageModel);
