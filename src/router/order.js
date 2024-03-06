const express = require("express");

const validateCreateOrder = require("../middlewares/validate-create-order");
const { createOrder } = require("../controllers/order");

module.exports = (app) => {
  const router = express.Router();

  app.use("/orders", router);
  router.post("/create/:id", validateCreateOrder, createOrder);
};
