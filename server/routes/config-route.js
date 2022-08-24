const productR = require("./product-routes");
const cartR = require("./cart-routes");
const userR = require("./users-routes");
const fs = require("fs");
const HttpError = require("../models/http-error");

exports.routesInit = (app) => {
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE"
    );

    next();
  });

  app.use("/api/products", productR);
  app.use("/api/cart", cartR);
  app.use("/api/users", userR);

  app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404);
    throw error;
  });

  app.use((error, req, res, next) => {
    if (req.file) {
      //for multer,deleting stored image from the disk cause error validation aquired after the image was stored.
      fs.unlink(req.file.path, (err) => {
        console.log(err);
      });
    }
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
  });
};
