const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  neighborhood: {
    type: String,
    required: true,
  },
  street1: {
    type: String,
    required: true,
  },
  street2: {
    type: String,
    required: false,
  },
  building: {
    type: String,
    required: true,
  },
  apartment: {
    type: String,
    required: true,
  },
});

const phoneSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (n) {
        return /^\d{11}$/.test(n);
      },
      message: "Please provide a valid number",
    },
  },
  secondryPhone: {
    type: String,
    required: false,
    validate: {
      validator: function (n) {
        return /^\d{11}$/.test(n);
      },
      message: "Please provide a valid number",
    },
  },
});

export default { addressSchema, phoneSchema };
