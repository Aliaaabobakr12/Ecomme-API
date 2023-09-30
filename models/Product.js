const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    en: {
      name: {
        type: String,
        required: [true, "Name is required"],
        minlength: 3,
        maxlength: 50,
      },
      description: {
        type: String,
        required: [true, "Please provide product's description"],
        minlength: [1000, "Description shouldn't be less than 1000 charctares"],
      },
      info: String,
    },
    ar: {
      name: {
        type: String,
        required: [true, "Name is required"],
        minlength: 3,
        maxlength: 50,
      },
      description: {
        type: String,
        required: [true, "Please provide product's description"],
        minlength: [1000, "Description shouldn't be less than 1000 charctares"],
      },
      info: String,
    },
    images: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
    },
    price: {
      type: Number,
      required: [true, "quantity is required"],
    },
    addedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: Date.now,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
