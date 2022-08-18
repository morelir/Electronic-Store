const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Rating = {
  amount: Number,
  stars: {
    oneStars: Number,
    twoStars: Number,
    threeStars: Number,
    fourStars: Number,
    fiveStars: Number,
  },
};

let Overview = {
  amount: Number,
  stars: {
    oneStars: Number,
    twoStars: Number,
    threeStars: Number,
    fourStars: Number,
    fiveStars: Number,
  },
};

const productSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  // rating: { type: Rating, required: true },
  // images: { type: [String], required: true },
  listPrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  // overview: { type: Map, of: String, required: true },
  // bulletsDescription: { type: [String], required: true },
});

// module.exports = mongoose.model("products", productSchema);
exports.Product = mongoose.model("products", productSchema);
