const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { routesInit } = require("./routes/config-route");
const bookingController = require("./controllers/booking-controller");

const path = require("path");
const app = express();

app.use(cors());

app.post(//req.body need to be in the raw form, so its need to be before bodyParser.json() convert the body to json format
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  bookingController.webhookCheckout
);

app.use(bodyParser.json());
app.use("/uploads", express.static(path.join("uploads")));

routesInit(app);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@online-store.v89if2n.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log(err);
  });
