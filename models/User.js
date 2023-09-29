const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  address: {
    required: [true, "Please provide address"],
    street: String,
    city: String,
    state: String,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
    validate: {
      validator: (mail) => {
        return validator.isEmail(mail);
      },
      message: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
    select: false,
  },
  phoneNumber: {
    type: String,
    required: [true, "Please provide phone number"],
    validate: {
      validator: function (n) {
        return /^\d{11}$/.test(n);
      },
      message: "Please provide a valid number",
    },
  },
  order: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
    required: [true, "Please provide the order ref"],
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", UserSchema);
