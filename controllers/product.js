const Product = require("../models/Product.model");
const ErrorResponse = require("../utils/errorResponse");

exports.addProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    if (!newProduct) {
      next(new ErrorResponse(`product not created`, 404));
    }
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    next(new ErrorResponse(` ${err.message}`, 404));
  }
};
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products) {
      next(new ErrorResponse(`cant fetch Products`, 404));
    }
    res.status(201).json({ success: true, data: products });
  } catch (err) {
    next(new ErrorResponse(` ${err.message}`, 404));
  }
};
exports.getProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      next(new ErrorResponse(`cant fetch Product with id of ${id}`, 400));
    }
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(new ErrorResponse(` ${err.message}`, 400));
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    if (!product) {
      next(new ErrorResponse(`cant update Product with id of ${id}`, 400));
    }
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(new ErrorResponse(` ${err.message}`, 400));
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id, req.body);
    if (!product) {
      next(new ErrorResponse(`cant delete Product with id of ${id}`, 400));
    }
    res
      .status(201)
      .json({ success: true, data: `${product._id} sucessfully deleted` });
  } catch (err) {
    next(new ErrorResponse(` ${err.message}`, 400));
  }
};
