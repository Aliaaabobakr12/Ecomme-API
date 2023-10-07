const Order = require("../models/Order");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils/checkPermissions");

const stripeAPI = ({ amount, currency }) => {
  const client_secret = "somerandomvalue";
  return { client_secret, amount };
};

const createOrder = async (req, res) => {
  const { items: cartItems, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError("No Cart items provided");
  }

  if (!shippingFee) {
    throw new CustomError.BadRequestError("Please provide shipping fee");
  }

  let orderItems = [];
  let subTotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No product with id: ${item.product}`
      );
    }
    const { name, image, price, quantity, _id } = dbProduct;
    const SingleOrderItem = {
      quantity: item.quantity,
      name,
      image,
      price,
      product: _id,
    };
    orderItems = [...orderItems, SingleOrderItem];
    subTotal += item.quantity * price;
  }

  const total = shippingFee + subTotal; // copoun

  // get client secret

  const paymentIntent = await stripeAPI({
    amount: total,
    currency: "EGP",
  });

  const order = await Order.create({
    orderItems,
    subTotal,
    total,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id: ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
};

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentId } = req.body;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.NotFoundError(`No order with id: ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  order.paymentId = paymentId;
  order.status = "paid";
  await order.save();
  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
  deleteOrder,
};
