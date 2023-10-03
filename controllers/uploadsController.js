const { StatusCodes } = require("http-status-codes");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { createProduct } = require("./productController");

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    { use_filename: true, folder: "Product-ecomme" }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  const imageSrc = result.secure_url;
  createProduct(req, res, imageSrc);
};

module.exports = { uploadProductImage };
