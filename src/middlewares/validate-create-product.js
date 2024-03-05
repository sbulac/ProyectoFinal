const { request, response } = require("express");

module.exports = (req = request, res = response, next) => {
  try {
    const { name, price } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ status: false, msg: "El nombre es requerido" });
    }

    if (!price) {
      return res
        .status(400)
        .json({ status: false, msg: "El precio es requerido" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, msg: "Error en el servidor" });
  }
};
