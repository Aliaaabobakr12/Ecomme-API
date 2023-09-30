const mongoose = require("mongoose");
const { addressSchema, phoneSchema } = require("./addressSchema");

const orderStatus = {
  pending: "pending",
  processing: "processing",
  delivered: "delivered",
  canceledByClient: "canceled by client",
  canceledByAdmin: "canceled by admin",
};

const paymentMethod = {
  cashOnDelivery: "cash on delivery",
};

const OrderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
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
    total: {
      type: Number,
      required: true,
    },
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
    name: {
      type: String,
      required: true,
    },
    products: [OrderItemSchema],
    phone: {
      type: phoneSchema,
      required: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
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
      default: "Pending",
    },
    paymenyMethod: {
      type: String,
      required: true,
      enum: Object.values(paymentMethod),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
