const HttpError = require("../models/http-error");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const Cart = require("../models/cart");

const createCart = async (req, res, next) => {
    
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { products:prods, totalQuantity, totalAmount } = req.body;

  const products = prods.map((prod) => {
    return { product: mongoose.Types.ObjectId(prod.id), amount: prod.amount };
  });

  const createdCart = new Cart({
    products,
    totalQuantity,
    totalAmount,
  });
  console.log(createdCart)

  try {
    await createdCart.save();
  } catch (err) {
    console.log("error")
    const error = new HttpError(
      "Creating cart failed, please try again.",
      500
    );
    return next(error);
  }
//   let cart = await Cart.findById(createdCart.id).populate("products.product");
//   console.log(cart.products[0].product)

  res.status(201).json({ createdCart });
};

exports.createCart = createCart;
