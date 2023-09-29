const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: [true, "Please provide an ID"],
  },
  name: {
    type: String,
    required: [true, "Please provide image name"],
  },
  src: {
    type: String,
    required: [true, "Please provide image url"],
  },
});

module.exports = mongoose.model("Image", imageSchema);
