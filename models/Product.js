const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "ID is required"],
    unique: [true, "ID shoudln't be use from other products"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: 3,
    maxlength: 50,
  },
  images: String,
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  description: {
    type: String,
    required: [true, "Please provide product's description"],
    minlength: [1000, "Description shouldn't be less than 1000 charctares"],
  },
  quantity: {
    type: Number,
    required: [true, "quantity is required"],
  },
  price: {
    type: Number,
    required: [true, "quantity is required"],
  },
  info: String,
});

module.exports = mongoose.model("Product", ProductSchema);
