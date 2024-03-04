const { request, response } = require("express");

module.exports = (req = request, res = response, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        status: false,
        msg: "El correo es requerido",
      });
    }
    if (!password) {
      return res.status(400).json({
        status: false,
        msg: "La contraseña es requerida",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: "Error en el servidor",
    });
  }
};
