const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId }).populate("reviews");
  if (!product) {
    throw new CustomError.NotFoundError(
      `No product found with id ${productId}`
    );
  }
  res.status(StatusCodes.OK).json({ product });
};

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new CustomError.NotFoundError(
      `No product found with id ${productId}`
    );
  }
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(
      `No product found with id ${productId}`
    );
  }
  await Product.deleteOne({ product });
  res.status(StatusCodes.OK).json({ msg: "Product removed" });
};

const uploadImage = async (req, res) => {
  console.log(req.files);
  if (!req.files) {
    throw new CustomError.BadRequestError("No Image uploaded");
  }
  const productImage = req.files.image;

  if (
    !productImage ||
    !productImage.mimetype ||
    !productImage.mimetype.startsWith("image")
  ) {
    throw new CustomError.BadRequestError("Please provide an image");
  }

  // const maxSize = 1024 * 1024;
  // if (productImage.size > maxSize) {
  //   throw new CustomError.BadRequestError(
  //     "Please uplaod an image smaller than 1MB"
  //   );
  // }

  const result = await cloudinary.uploader.upload(productImage.tempFilePath, {
    use_filename: true,
    folder: "Product-ecomme",
  });

  console.log("Temp File Path:", productImage.tempFilePath);
  fs.unlinkSync(productImage.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
