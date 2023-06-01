const mongoose = require("mongoose");

// let Rating = {
//   amount: Number,
//   stars: {
//     oneStars: Number,
//     twoStars: Number,
//     threeStars: Number,
//     fourStars: Number,
//     fiveStars: Number,
//   },
// };

const productSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      //set will run each time that new value is set for this field
      set: (val) => Math.round(val * 10) / 10, //Trick to round deciaml - 4.66666, 46.6666 , 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    images: { type: [String], required: true },
    listPrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    overview: { type: [[String]] },
    bulletsDescription: { type: [String], required: true },
    cart: {
      type: mongoose.Types.ObjectId,
      ref: "carts",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// productSchema.methods.finalPrice = function() {
//   if (this.discount) {
//     return (1 - this.discount / 100) * this.listPrice;
//   } else {
//     return this.listPrice;
//   }
// };

module.exports = mongoose.model("products", productSchema);
// exports.Product = mongoose.model("products", productSchema);
