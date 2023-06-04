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
      id: user.cart.id,
      products: user.cart.products,
      totalQuantity: user.cart.totalQuantity,
      totalAmount: user.cart.totalAmount,
    });
  }
  res.status(201).json({});
};

const getCartProducts = async (req, res, next) => {
  const cartId = req.params.cartId;
  let cart;
  try {
    cart = await Cart.findById(cartId).populate("products.product");
  } catch (err) {
    const error = new HttpError(
      "Fetching product failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!cart) {
    const error = new HttpError(
      "Could not find this cart, please try again later.",
      404
    );
    return next(error);
  }

  return res.status(201).json({
    products: cart.products,
  });
};

const updateCart = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const productId = req.params.prodId;
  const { price, amount } = req.body;

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
    try {
      await user.cart.save();
    } catch (err) {
      const error = new HttpError("Saving cart failed, please try again.", 500);
      return next(error);
    }
  } else {
    let newCart = new Cart({
      user: user.id,
      products: [
        {
          amount: amount,
          product: mongoose.Types.ObjectId(productId),
        },
      ],
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
    id: user.cart.id,
    products: user.cart.products,
    totalQuantity: user.cart.totalQuantity,
    totalAmount: user.cart.totalAmount,
  });
};

const removeProductFromCart = async (req, res, next) => {
  const productId = req.params.prodId;

  let user;
  try {
    user = await User.findById(req.userData.userId).populate({
      path: "cart",
      populate: {
        path: "products.product",
        model: "products",
      },
    });
  } catch (err) {
    const error = new HttpError(
      "Removing product from cart failed, please try again.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  let cartProduct = user.cart.products.find(
    (prod) => prod._id.toString() === productId
  );
  let product = cartProduct.product;

  user.cart.totalQuantity--;
  user.cart.totalAmount -= product.discount
    ? (1 - product.discount / 100) * product.listPrice
    : product.listPrice;

  if (cartProduct.amount === 1) {
    user.cart.products = user.cart.products.filter(
      (prod) => prod._id.toString() !== productId
    );
  } else {
    cartProduct.amount--;
  }

  try {
    await user.cart.save();

  } catch (err) {
    const error = new HttpError(
      "Saving cart after removing product failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({
    id: user.cart.id,
    products: user.cart.products,
    totalQuantity: user.cart.totalQuantity,
    totalAmount: user.cart.totalAmount,
  });
};

exports.updateCart = updateCart;
exports.removeProductFromCart = removeProductFromCart;
exports.getCart = getCart;
exports.getCartProducts = getCartProducts;
