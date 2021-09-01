const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductModel = new Schema({
  title: {
    type: String,
    required: [true, "please add a Title"],
    maxlength: [50, "cant be more that 50 characters"],
  },
  type: {
    type: String,
    required: [true, "please add a type"],
    maxlength: [50, "cant be more that 50 characters"],
  },
  description: {
    type: String,
    required: [true, "please add a Description"],
    maxlength: [50, "cant be more that 50 characters"],
  },
  filename: {
    type: String,
    required: [true, "please add a Filename"],
    maxlength: [50, "cant be more that 50 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  price: Number,
});
const Product = mongoose.model("Product", ProductModel);
module.exports = Product;
