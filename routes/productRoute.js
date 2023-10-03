const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { uploadProductImage } = require("../controllers/uploadsController");

router
  .route("/")
  .get(getAllProducts)
  .post(createProduct)
  .post(uploadProductImage);
router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
