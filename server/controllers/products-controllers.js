const HttpError = require("../models/http-error");
const Product = require("../models/product");

const getRandomProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.aggregate([{ $sample: { size: 9 } }]); // You want to get 9 docs
  } catch (err) {
    const error = new HttpError(
      "Fetching products failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!products) {
    const error = new HttpError("Fetching products failed.", 404);
    return next(error);
  }

  res.json({
    products,
  });
};

const applyFiltersOnProducts = async ({ search, category }) => {
  let products;
  try {
    if (category) products = await Product.find({ category: category });
    else if (search)
      products = await Product.find({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ],
      });
    return products;
  } catch (err) {
    const error = new HttpError(
      "Fetching products failed, please try again later.",
      500
    );
    return error;
  }
};

const getProducts = async (req, res, next) => {
  let products;
  try {
    products = await applyFiltersOnProducts(req.query);
  } catch (err) {
    return next(err);
  }

  if (!products) {
    const error = new HttpError("Fetching products failed.", 404);
    return next(error);
  }

  res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
};



const getProductById = async (req, res, next) => {
  const productId = req.params.productId;
  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      "Fetching product failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError(
      "Could not find product, please try again later.",
      404
    );
    return next(error);
  }

  res.json({
    product: product.toObject({ getters: true }),
  });
};


exports.getProducts = getProducts;
exports.getRandomProducts = getRandomProducts;
exports.getProductById = getProductById;

