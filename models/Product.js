const mongoose = require("mongoose");

const langSchema = new mongoose.Schema({
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
});

const ProductSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    images: {
      type: [
        {
          location: String,
          key: String,
        },
      ],
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
    en: langSchema,
    ar: langSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
