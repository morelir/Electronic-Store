const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Product = require("../models/product");

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
          unit_amount: Math.round(
            (1 - product.discount / 100) * product.listPrice * 100
          ), // multiply by 100 for converting to cent
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
    metadata: { uid: req.userData.userId },
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

const createBookingCheckout = async (event) => {
  console.log("1");
  const session = event.data.object;
  console.log(session);
  const user = session.metadata.uid;
  console.log("2)" + user);

  const lineItems = await stripe.checkout.sessions.listLineItems(
    event.data.object.id,
    {
      limit: 100,
      expand: ["data.price.product"],
    }
  );
  console.log("3)" + lineItems);
  const products = lineItems.data.map((item, index) => {
    return {
      name: item.description,
      price: item.amount_total / 100,
      currency: item.currency,
      quantity: item.quantity,
    };
  });

  console.log(products);
  console.log("+-------------------------------+");
  console.log(user);
};

exports.webhookCheckout = (req, res, next) => {
  console.log("webhook start");
  const signature = req.headers["stripe-signature"];

  let event;
  console.log("webhook start1");
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
  console.log("webhook start2");

  if (event.type === "checkout.session.completed") createBookingCheckout(event);

  // Return a 200 response to acknowledge receipt of the event (to stripe)
  res.status(200).json({ recevied: true });
};
