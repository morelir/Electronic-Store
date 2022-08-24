const mongoose = require("mongoose");

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

const productSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  rating: { type: Rating, required: true },
  images: { type: [String], required: true },
  listPrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  overview: { type: [[String]], required: true },
  bulletsDescription: { type: [String], required: true },
  cart: {
    type: mongoose.Types.ObjectId,
    ref: "carts",
  },
});

// productSchema.methods.finalPrice = function() {
//   if (this.discount) {
//     return (1 - this.discount / 100) * this.listPrice;
//   } else {
//     return this.listPrice;
//   }
// };

module.exports = mongoose.model("products", productSchema);
// exports.Product = mongoose.model("products", productSchema);
