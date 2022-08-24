const mongoose = require("mongoose");

let Product = {
  amount: { type: Number, required: true },
  product: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "products",
  },
};

const productSchema = new mongoose.Schema({
  user:{ type: mongoose.Types.ObjectId, required: true, ref: 'users' },
  products: [Product],
  totalAmount: { type: Number, required: true },
  totalQuantity: { type: Number, required: true },
});

module.exports = mongoose.model("carts", productSchema);
