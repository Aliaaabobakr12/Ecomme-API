const mongoose = require("mongoose");

// const langSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Name is required"],
//     minlength: 3,
//     maxlength: 50,
//   },
//   description: {
//     type: String,
//     required: [true, "Please provide product's description"],
//     minlength: [1000, "Description shouldn't be less than 1000 charctares"],
//   },
// });

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, "Please provide product's description"],
      minlength: [12, "Description shouldn't be less than 1000 charctares"],
    },
    // image: {
    //   type: [
    //     {
    //       location: String,
    //       key: String,
    //     },
    //   ],
    //   required: true,
    // },
    image: {
      type: String,
      required: true,
    },
    // category: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Category",
    //   required: [true, "Category is required"],
    //},
    // subCategory: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "subCategory",
    // },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
    },
    price: {
      type: Number,
      required: [true, "quantity is required"],
    },
    // en: langSchema,
    // ar: langSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

// name ✅
// describtion ✅
// category ✅
// subcategory ✅
// price ✅
// images ✅
// thumbnail
// availableItems (quantity)✅
// slodItems
// discount
// brand
// year
// model
// expireDate
