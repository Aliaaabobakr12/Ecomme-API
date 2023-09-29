const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: {},
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  images: {},
  category: {},
  description: {},
  quantity: {},
  price: {},
  info: {},
});
