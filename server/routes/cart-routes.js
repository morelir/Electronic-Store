const express = require("express");
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth")

const cartControllers = require("../controllers/cart-controllers");

const router = express.Router();


router.put(
  "/",
  [
    check("products").isArray().notEmpty(),
    check("totalQuantity").isInt({ min: 1}),
    check("totalAmount").isFloat({ min: 0}),
  ],
  cartControllers.createCart
);

router.use(checkAuth); //middleware that cheacking authentication to all middleware(routes) below.


module.exports = router;
