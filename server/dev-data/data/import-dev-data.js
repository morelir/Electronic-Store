const mongoose = require("mongoose");
const fs = require("fs");
const Product = require("../../models/product");


mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@online-store.v89if2n.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log("DB connection successfull!"));

//READ JSON FILE
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, "utf-8")
);

//IMPORT DATA INTO DB
const importData = async () => {
  try {
    console.log(products[0])
    await Product.create(products);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
