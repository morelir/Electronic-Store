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
      "Something went wrong, could not find products for this category.",
      500
    );
    return next(error);
  }

  if (!products || products.length === 0) {
    const error = new HttpError(
      "Could not find products for the provided category.",
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

// const getPlacesByUserId = async (req, res, next) => {
//   const userId = req.params.uid;

//   // let places;
//   let userWithPlaces;
//   try {
//     userWithPlaces = await User.findById(userId).populate("places");
//   } catch (err) {
//     const error = new HttpError(
//       "Fetching places failed, please try again later.",
//       500
//     );
//     return next(error);
//   }

//   // if (!places || places.length === 0) {
//   if (!userWithPlaces || userWithPlaces.places.length === 0) {
//     return next(
//       new HttpError("Could not find places for the provided user id.", 404)
//     );
//   }

//   res.json({
//     places: userWithPlaces.places.map((place) =>
//       place.toObject({ getters: true })
//     ),
//   });
// };

// const createPlace = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(
//       new HttpError("Invalid inputs passed, please check your data.", 422)
//     );
//   }

//   const { title, description, address} = req.body;

//   let coordinates;
//   try {
//     coordinates = await getCoordsForAddress(address);
//   } catch (error) {
//     return next(error);
//   }

//   const createdPlace = new Place({
//     title,
//     description,
//     address,
//     location: coordinates,
//     image: req.file.path,
//     creator: req.userData.userId,
//   });

//   let user;
//   try {
//     user = await User.findById(req.userData.userId);
//   } catch (err) {
//     const error = new HttpError(
//       "Creating place failed, please try again.",
//       500
//     );
//     return next(error);
//   }

//   if (!user) {
//     const error = new HttpError("Could not find user for provided id.", 404);
//     return next(error);
//   }

//   try {
//     const sess = await mongoose.startSession();
//     sess.startTransaction();
//     await createdPlace.save({ session: sess });
//     user.places.push(createdPlace);
//     await user.save({ session: sess });
//     await sess.commitTransaction();
//   } catch (err) {
//     const error = new HttpError(
//       "Creating place failed, please try again.",
//       500
//     );
//     return next(error);
//   }

//   res.status(201).json({ place: createdPlace });
// };

// const updatePlace = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(
//       new HttpError("Invalid inputs passed, please check your data.", 422)
//     );
//   }

//   const { title, description } = req.body;
//   const placeId = req.params.pid;

//   let place;
//   try {
//     place = await Place.findById(placeId);
//   } catch (err) {
//     const error = new HttpError(
//       "Something went wrong, could not update place.",
//       500
//     );
//     return next(error);
//   }

//   if (place.creator.toString() !== req.userData.userId) {
//     const error = new HttpError("You are not allowed to edit this place.", 401);
//     return next(error);
//   }

//   place.title = title;
//   place.description = description;

//   try {
//     await place.save();
//   } catch (err) {
//     const error = new HttpError(
//       "Something went wrong, could not update place.",
//       500
//     );
//     return next(error);
//   }

//   res.status(200).json({ place: place.toObject({ getters: true }) });
// };

// const deletePlace = async (req, res, next) => {
//   const placeId = req.params.pid;

//   let place;
//   try {
//     place = await Place.findById(placeId).populate("creator");
//   } catch (err) {
//     const error = new HttpError(
//       "Something went wrong, could not delete place.",
//       500
//     );
//     return next(error);
//   }

//   if (!place) {
//     const error = new HttpError("Could not find place for this id.", 404);
//     return next(error);
//   }

//   if (place.creator.id !== req.userData.userId) {
//     // smilar check at update route the diffrent "creator.id" here and there "creator.toString()"
//     const error = new HttpError(
//       "You are not allowed to delete this place.",
//       401
//     );
//     return next(error);
//   }

//   const imagePath = place.image;

//   try {
//     const sess = await mongoose.startSession();
//     sess.startTransaction();
//     await place.remove({ session: sess });
//     place.creator.places.pull(place);
//     await place.creator.save({ session: sess });
//     await sess.commitTransaction();
//   } catch (err) {
//     const error = new HttpError(
//       "Something went wrong, could not delete place.",
//       500
//     );
//     return next(error);
//   }

//   fs.unlink(imagePath, (err) => {
//     console.log(err);
//   });

//   res.status(200).json({ message: "Deleted place." });
// };

exports.getProductById = getProductById;
exports.getProductsByCategory = getProductsByCategory;
exports.getProductsByInputSearch = getProductsByInputSearch;

