const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Product = require("../models/product");;
const path = require("path");

exports.getCheckoutSession = async (req, res, next) => {
  // 1) Get the currently booked product
  const product = await Product.findById(req.params.productId);

  // 2) Create checkout session
  const transformedItems = [
    {
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: (1 - product.discount / 100) * product.listPrice * 100, // multiply by 100 for converting to cent
        product_data: {
          name: `${product.title} product`,
          images: [
            `https://electronic-store-online.onrender.com/${product.images[0].replace(/\\/g,'/')}`, //replace backslashes with forward slashs
          ], //only accepts live images (images hosted on the internet),
        },
      },
    },
  ];

  const session = await stripe.checkout.sessions.create({
    // Session Information
    payment_method_types: ["card"],
    success_url: `${req.get('origin')}`,
    cancel_url: `${req.get('origin')}/products/${req.params.productId}`,
    customer_email: 'webappsce@gmail.com',
    client_reference_id: req.params.productID,
    // Product Purchase Information
    line_items: transformedItems,
    mode: "payment",
  });
  
  // 3) Create session as response
  res.status(200).json({
    status: "success",
    id:session.id,
  });
};
