const fs = require("fs");
// const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Product = require("../models/product");
// const {Product} = require("../models/product");
// const User = require("../models/user");


const getProductsByCategory = async (req, res, next) => {
  const category = req.params.category;
  let products;
  try {
    products = await Product.find({ category: category });
  } catch (err) {
    const error = new HttpError(
      "Fetching products failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!products) {
    const error = new HttpError(
      "Fetching products failed.",
      404
    );
    return next(error);
  }
  
  res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
};

const getProductById = async (req, res, next) => {
  const productId = req.params.productId;
  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      "Fetching product failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError(
      "Could not find product, please try again later.",
      404
    );
    return next(error);
  }


  res.json({
    product: product.toObject({ getters: true }),
  });
};

const getProductsByInputSearch = async (req, res, next) => {
  const input = req.params.input;
  let products;
  try {
    products = await Product.find({ "title": { "$regex": input, "$options": "i" } });
  } catch (err) {
    const error = new HttpError(
      "Fetching products failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!products) {
    const error = new HttpError(
      "Fetching products failed.",
      404
    );
    return next(error);
  }
  
  res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
};



exports.getProductById = getProductById;
exports.getProductsByCategory = getProductsByCategory;
exports.getProductsByInputSearch = getProductsByInputSearch;

