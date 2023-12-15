const express = require("express");
const bookingController = require("../controllers/booking-controller");

const router = express.Router();

router.get("/checkout-session/:productId", bookingController.getCheckoutSession);

module.exports = router;
