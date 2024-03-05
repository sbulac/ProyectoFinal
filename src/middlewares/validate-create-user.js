const { request, response } = require("express");

module.exports = (req = request, res = response, next) => {
  try {
    const { nombre, email, numero, password } = req.body;

    if (!nombre) {
      return res
        .status(400)
        .json({ status: false, msg: "El nombre es requerido" });
    }

    if (!email) {
      return res
        .status(400)
        .json({ status: false, msg: "El email es requerido" });
    }

    const emailFormat = /^[a-zA-Z0-9.]+@{1}[a-zA-Z0-9.]+$/;

    if (!emailFormat.test(email)) {
      return res
        .status(400)
        .json({ status: false, msg: "El email es invalido" });
    }
    if (!numero) {
      return res
        .status(400)
        .json({ status: false, msg: "El numero es requerido" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ status: false, msg: "La contraseña es requerida" });
    }

    const passwordFormat = /^[0-9a-zA-Z!@#$%^&*()_+-=[\]{};':"\\|,.<>/?]{8,15}/;

    if (!passwordFormat.test(password)) {
      return res
        .status(400)
        .json({ status: false, msg: "La contraseña es invalida" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, msg: "Error en el servidor" });
  }
};
