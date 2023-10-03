const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { addressSchema, phoneSchema } = require("./addressSchema");

const UserSchema = new mongoose.Schema({
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
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  // address: {
  //   type: addressSchema,
  //   required: true,
  // },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
  },
  //   phoneNumber: {
  //     type: phoneSchema,
  //     required: true,
  //   },
  userType: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
  //   order: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: "Order",
  //     required: [true, "Please provide the order ref"],
  //   },
  // },
  // { timestamps: true }
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
