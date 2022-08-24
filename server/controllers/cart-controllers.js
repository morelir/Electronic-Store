const HttpError = require("../models/http-error");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const Cart = require("../models/cart");
const User = require("../models/user");

const getCart = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.userData.userId).populate({
      path: "cart",
    });
  } catch (err) {
    const error = new HttpError("Updating cart failed, please try again.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  if (user.cart) {
    return res.status(201).json({
      products: user.cart.products,
      totalQuantity: user.cart.totalQuantity,
      totalAmount: user.cart.totalAmount,
    });
  }
  res.status(201).json({});
};

const updateCart = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { productId, price, amount } = req.body;

  let user;
  try {
    user = await User.findById(req.userData.userId).populate({
      path: "cart",
    });
  } catch (err) {
    const error = new HttpError("Updating cart failed, please try again.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  if (user.cart) {
    let existingProduct = user.cart.products.find(
      (prod) => prod.product.toString() === productId
    );
    user.cart.totalQuantity += amount;
    user.cart.totalAmount += price * amount;
    if (!existingProduct) {
      user.cart.products.push({
        product: mongoose.Types.ObjectId(productId),
        amount: amount,
      });
    } else {
      existingProduct.amount += amount;
    }
    await user.cart.save();
  } else {
    let newCart = new Cart({
      user: user.id,
      products: [{
        amount: amount,
        product: mongoose.Types.ObjectId(productId),
      }],
      totalAmount: price * amount,
      totalQuantity: amount,
    });

    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await newCart.save({ session: sess });
      user.cart = newCart;
      await user.save({ session: sess });
      await sess.commitTransaction();
    } catch (err) {
      const error = new HttpError(
        "Updating cart failed, please try again.",
        500
      );
      return next(error);
    }
  }

  res.status(201).json({
    products: user.cart.products,
    totalQuantity: user.cart.totalQuantity,
    totalAmount: user.cart.totalAmount,
  });
};

exports.updateCart = updateCart;
exports.getCart = getCart;
