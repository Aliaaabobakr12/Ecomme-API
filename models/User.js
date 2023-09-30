const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const addressSchema = require("./addressSchema");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 50,
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
    },
    address: {
      type: addressSchema,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 8,
      select: false,
    },
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
    userType: {
      type: String,
      required: true,
      enum: ["customer", "admin", "owner"],
    },
    order: {
      type: mongoose.Schema.ObjectId,
      ref: "Order",
      required: [true, "Please provide the order ref"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", UserSchema);
