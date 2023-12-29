const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false, minlength: 6 },
  image: { type: String, default: "default-user.jpg" },
  cart: { type: mongoose.Types.ObjectId, ref: "carts" },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("users", userSchema);
