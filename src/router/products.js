const express = require("express");
const {
  getProducts,
  createProducts,
  updateProduct,
  disableProduct,
  enableProduct,
} = require("../controllers/products");
const validateCreateProduct = require("../middlewares/validate-create-product");

module.exports = (app) => {
  const router = express.Router();

  app.use("/products", router);
  router.get("/", getProducts);
  router.post("/create", validateCreateProduct, createProducts);
  router.patch("/update/:id", validateCreateProduct, updateProduct);
  router.patch("/disable/:id", disableProduct);
  router.patch("/enable/:id", enableProduct);
};
