const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

const ErrorResponse = require("../utils/errorResponse");

exports.register = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      next(new ErrorResponse(`User already Exists`, 404));
    } else {
      const newUser = await User.create(req.body);
      const token = newUser.getSignedJwtToken();
      if (!token) {
        next(new ErrorResponse(`User not created`, 404));
      }
      res.status(201).json({ success: true, data: token });
    }
  } catch (err) {
    next(new ErrorResponse(` ${err.message}`, 404));
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(new ErrorResponse("Please provide email and password", 400));
    }
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return next(
        new ErrorResponse(
          ` ${req.body.email} doesnt exist, please register`,
          404
        )
      );
    } else {
      console.log(user);
      const token = user.getSignedJwtToken();
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        next(new ErrorResponse("invalid credentials password", 401));
      }
      res.status(200).json({ success: "true", token });
    }
  } catch (err) {
    next(new ErrorResponse(` ${err.message}`, 404));
  }
};
