const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Product = require("../models/product");
const path = require("path");

exports.getCheckoutSession = async (req, res, next) => {
  const products = req.body.products;

  // Create checkout session
  const line_items = await Promise.all(
    products.map(async (item) => {
      // Get the currently booked product
      const { productId, amount } = item;
      const product = await Product.findById(productId);
      if (!product) {
        const error = new HttpError("No document found with that ID.", 404);
        return next(error);
      }

      return {
        quantity: amount,
        price_data: {
          currency: "usd",
          unit_amount: Math.round((1 - product.discount / 100) * product.listPrice * 100), // multiply by 100 for converting to cent
          product_data: {
            name: `${product.title} product`,
            images: [
              `https://electronic-store-online.onrender.com/${product.images[0].replace(
                /\\/g,
                "/"
              )}`, //replace backslashes with forward slashs
            ], //only accepts live images (images hosted on the internet),
          },
        },
      };
    })
  );

  const session = await stripe.checkout.sessions.create({
    // Session Information
    payment_method_types: ["card"],
    success_url: `${req.get("origin")}`,
    cancel_url: req.body.fallbackUrl ?? `${req.get("origin")}`,
    // customer_email: "webappsce@gmail.com",
    // client_reference_id: productId,
    // Product Purchase Information
    line_items: line_items,
    mode: "payment",
  });

  // 3) Create session as response
  res.status(200).json({
    status: "success",
    id: session.id,
  });
};
