const express = require("express");

const productsControllers = require("../controllers/products-controllers");

const router = express.Router();
router.get("/", productsControllers.getProducts);
router.get("/randomProducts", productsControllers.getRandomProducts);
router.get("/:productId", productsControllers.getProductById);

module.exports = router;
