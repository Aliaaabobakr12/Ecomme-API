const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  id: {},
  name: {
    type: String,
    required: [true, "Please provide category name"],
  },
  isParent: {},
  subCategory: {},
});
