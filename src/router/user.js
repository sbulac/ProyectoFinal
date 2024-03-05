const express = require("express");
const jwt = require("../middlewares/jwt");
const jwt2 = require("jsonwebtoken");
const validateCreateUser = require("../middlewares/validate-create-user");
const { login, createClient, disableClient, enableClient } = require("../controllers/user");
const config = require("../config");
const validateLogin = require("../middlewares/validate-login");

module.exports = (app) => {
  const router = express.Router();

  app.use("/users", router);
  router.get("/", (req, res) => {
    const resJwt = jwt2.sign(
      {
        nombre: "Sebastian",
        correo: "sb.bulac@gmail.com",
        numero: "3163202917",
        password: "1234567890",
      },
      config.keyToken
    );
    res.send(resJwt);
  });

  router.post("/register", [jwt, validateCreateUser], createClient);
  router.post("/login", validateLogin, login);
  router.patch("/disable/:id", disableClient);
  router.patch("/enable/:id", enableClient);
};
