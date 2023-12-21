const mongoose = require("mongoose");

const Product = {
  amount: {
    type: Number,
    required: [true, "Booking must have an amount for each associated product"],
  },
  product: {
    type: mongoose.Types.ObjectId,
    required: [true, "Booking must have an product ID for associated product"],
    ref: "products",
  },
};

const bookingSchema = new mongoose.Schema(
  {
    products: [Product],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: [true, "Booking must belong to a User!"],
    },
    totalAmount: {
      type: Number,
      set: (val) => Math.round(val * 100) / 100,
      require: [true, "Booking must have a total amount."],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    paid: {
      type: Boolean,
      default: true,
    },
  },
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
