const express = require("express");
const bookingController = require("../controllers/booking-controller");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuth); //middleware for checking authentication for all middlewares(routes) below it.

router.post("/checkout-session", bookingController.getCheckoutSession);
router.get("/",bookingController.getAllBooking)
module.exports = router;
