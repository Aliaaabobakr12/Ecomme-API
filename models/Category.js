const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: [true, "ID must be unique"],
  },
  name: {
    type: String,
    required: [true, "Please provide category name"],
  },
  isParent: {
    type: Boolean,
    default: false,
  },
  subCategory: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("Category", CategorySchema);
