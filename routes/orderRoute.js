const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const {
  authenticateUser,
  authorizePermission,
} = require("../middleware/authentication");

router
  .route("/")
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizePermission("admin"), getAllOrders);

router.route("/showAllMyOrders").get(authenticateUser, getCurrentUserOrders);

router
  .route("/:id")
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrder)
  .delete(authenticateUser, deleteOrder);

module.exports = router;
