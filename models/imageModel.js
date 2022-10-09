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
  },
});

module.exports = mongoose.model("Image", imageModel);
