const mongoose = require("mongoose");
const { addressSchema, phoneSchema } = require("./addressSchema");

const orderStatus = {
  pending: "pending",
  paid: "paid",
  processing: "processing",
  delivered: "delivered",
  canceledByClient: "canceled by client",
  canceledByAdmin: "canceled by admin",
};

const SingleOrderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "The minmum quantity is one item"],
    },
    price: {
      type: Number,
      required: true,
    },
    // total: {
    //   type: Number,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [SingleOrderItemSchema],
    orderNote: {
      type: String,
      required: false,
    },
    orderdate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(orderStatus),
      default: "pending",
    },
    paymenyMethod: {
      type: String,
      required: true,
      enum: ["Cash on delivery", "Credit card"],
      default: "Cash on delivery",
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
    },
  },
  { timestamps: true }
);
// {user} - {name} - {total price }- copouns
// copoun model - address - status - payment: visa - cash: defualt
// order: items of user - order price
// check the quantity
// final price - copoun
// invoice fun to pdf
// visa: stripe
// 3 emails:

module.exports = mongoose.model("Order", OrderSchema);

// tax - {shipping fee} - {subtotal} - {total} - {orderitems} - {status} - {user} - clientSecret - paymentId
