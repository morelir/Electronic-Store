const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/product');
// const Tour = require('../models/tourModel');
// const catchAsync = require('../utils/catchAsync');
// const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    console.log("here")
  // 1) Get the currently booked tour
  const tour = await Product.findById(req.params.tourId);

  // 2) Create checkout session
  const transformedItems = [
    {
      quantity: 1,
      price_data: {
        currency: 'usd',
        unit_amount: tour.price * 100,
        product_data: {
          name: `${tour.name} Tour`,
          description: tour.description,
          images: [`https://www.natours.dev/img/tours/${tour.imageCover}`] //only accepts live images (images hosted on the internet),
        }
      }
    }
  ];

  const session = await stripe.checkout.sessions.create({
    // Session Information
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${
      req.params.tourId
    }&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    // customer_email: req.user.email,
    // client_reference_id: req.params.tourID,
    // Product Purchase Information
    line_items: transformedItems,
    mode: 'payment'
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session
  });
});