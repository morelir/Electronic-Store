const express = require("express");
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth");

const cartControllers = require("../controllers/cart-controllers");

const router = express.Router();



router.use(checkAuth); //middleware that cheacking authentication to all middleware(routes) below.

router.get("/", cartControllers.getCart);

router.get("/:cartId/products", cartControllers.getCartProducts);

router.put(
  "/",
  [
    check("productId").isString().notEmpty(),
    check("price").isFloat({ min: 1 }),
    check("amount").isInt({ min: 1 }),
  ],
  cartControllers.updateCart
);

module.exports = router;
