const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();


const config = require("./config");
const userApi = require("./router/user");
const productsApi = require("./router/products");
const ordersApi = require("./router/order");

const app = express();

app.use(bodyParser.json());

userApi(app);
productsApi(app)
ordersApi(app)

app.listen(config.port, () => {
  console.log(`Running on port: ${config.port}`);
});
