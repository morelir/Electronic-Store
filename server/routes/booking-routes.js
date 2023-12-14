const express = require('express');
const bookingController = require('../controllers/booking-controller');

const router = express.Router();



router.get('/checkout-session/:tourId', bookingController.getCheckoutSession);