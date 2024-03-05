const { request, response } = require("express");

module.exports = (req = request, res = response, next) => {
  try {
    const { id_products } = req.body;

    if (!id_products.length === 0) {
      return res
        .status(400)
        .json({ status: false, msg: "No hay ningun producto en el pedido" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, msg: "Error en el servidor" });
  }
};
