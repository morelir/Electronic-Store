const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Booking = require("../models/booking");
const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getAllBooking = async (req, res, next) => {
  const booking = await Booking.find({ user: req.userData.userId }).populate("products.product");
  res.status(200).json({
    status: "success",
    data: {
      data: booking,
    },
  });
};

exports.getCheckoutSession = async (req, res, next) => {
  const { cartId, prodId, prodAmount } = req.body;
  let cart, prod, line_items;
  //Two options to create a checkout session with a cart or a product, depends on provided req.body params
  if (cartId) {
    cart = await Cart.findById(cartId).populate("products.product");
    if (!cart) {
      const error = new HttpError("No document found with that ID.", 404);
      return next(error);
    }
    // Create checkout session for cart
    line_items = cart.products.map((item) => {
      return {
        quantity: item.amount,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(
            (1 - item.product.discount / 100) * item.product.listPrice * 100
          ), // multiply by 100 for converting to cent
          product_data: {
            name: `${item.product.title} product`,
            images: [
              `https://electronic-store-online.onrender.com/${item.product.images[0].replace(
                /\\/g,
                "/"
              )}`, //replace backslashes with forward slashs
            ], //only accepts live images (images hosted on the internet),
          },
        },
      };
    });
  } else if (prodId && prodAmount) {
    prod = await Product.findById(prodId);
    if (!prod) {
      const error = new HttpError("No document found with that ID.", 404);
      return next(error);
    }
    // Create checkout session for product
    line_items = [
      {
        quantity: prodAmount,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(
            (1 - prod.discount / 100) * prod.listPrice * 100
          ), // multiply by 100 for converting to cent
          product_data: {
            name: `${prod.title} product`,
            images: [
              `https://electronic-store-online.onrender.com/${prod.images[0].replace(
                /\\/g,
                "/"
              )}`, //replace backslashes with forward slashs
            ], //only accepts live images (images hosted on the internet),
          },
        },
      },
    ];
  } else {
    const error = new HttpError("No document found with that ID.", 404);
    return next(error);
  }
  
  const session = await stripe.checkout.sessions.create({
    // Session Information
    payment_method_types: ["card"],
    metadata: { uid: req.userData.userId, cartId, prodId, prodAmount },
    success_url: `${req.get("origin")}/auth`,
    cancel_url: req.body.fallbackUrl ?? `${req.get("origin")}`,
    // customer_email: "webappsce@gmail.com",
    // Product Purchase Information
    line_items: line_items,
    mode: "payment",
  });
  
  //createBookingCheckout(session)

  // 3) Create session as response
  res.status(200).json({
    status: "success",
    id: session.id,
  });
};

exports.webhookCheckout = (req, res, next) => {
  console.log("webhook start");
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "checkout.session.completed")
    createBookingCheckout(event.data.object);

  // Return a 200 response to acknowledge receipt of the event (to stripe)
  res.status(200).json({ recevied: true });
};

const createBookingCheckout = async (session) => {
  // const user = session.metadata.uid;
  const { cartId, prodId, prodAmount, uid } = session.metadata;
  let cart, prod;
  if (cartId) {
    //create booking from cart && delete cart
    cart = await Cart.findById(cartId);
    await Booking.create({
      products: cart.products,
      user: cart.user,
      totalAmount: cart.totalAmount,
    });
    await Cart.findByIdAndDelete(cartId);

  } else if (prodId && prodAmount) {
    prod = await Product.findById(prodId);
    console.log(prod);
    await Booking.create({
      products: [{ amount: prodAmount, product: prod.id }],
      user: uid,
      totalAmount: (1 - prod.discount / 100) * prod.listPrice * prodAmount,
    });
  } else {
    const error = new HttpError("No document found with that ID.", 404);
    return next(error);
  }
};
