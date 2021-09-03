const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const UserModel = new Schema({
  name: {
    type: String,
    required: [true, "please add a message"],
    trim: true,
    maxlength: [50, "cant be more that 50 chracters"],
  },
  email: {
    type: String,
    required: [true, "please add a message"],
    unique: true,
    trim: true,
    maxlength: [50, "cant be more that 50 chracters"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please input a valid mail",
    ],
  },
  role: {
    type: String,
    required: [true, "please add a message"],
    trim: true,
    maxlength: [50, "cant be more that 50 chracters"],
  },
  password: {
    type: String,
    required: [true, "please add a message"],
    trim: true,
    minlength: [8, "Must be more than 8 Characters"],
    select: false,
  },
  resetPasswordToke: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
UserModel.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
UserModel.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
UserModel.methods.matchPassword = async function (enteredPassword) {
  console.log("eer");
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model("User", UserModel);
module.exports = User;
