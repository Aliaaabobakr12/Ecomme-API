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

export default addressSchema;
