const { request, response } = require("express");
const { sequelieze, Products, Orders } = require("../models");

const createOrder = async (req = request, res = response) => {
  const transaction = await sequelieze.transaction();
  try {
    const { id_products } = req.body;
    const { id: id_client } = req.params;

    if (id_products.length === 0) {
      await transaction.rollback();
      return res.status(400).json({
        msg: "No hay ningun producto en el pedido",
        status: false,
      });
    }

    const products = await Products.findAll();
    const allProducts = products.filter((product) => {
      return product.toJSON().state !== 0;
    });

    const listOfId = [];

    allProducts.forEach((products) => {
      listOfId.push(products.toJSON().id);
    });

    const isContained = id_products.every((element) =>
      listOfId.includes(element)
    );

    if (!isContained) {
      return res.status(404).json({
        msg: "Hay productos que no están registrados",
        status: false,
      });
    }

    const orderCreated = await Orders.create(
      { id_client, id_products },
      {
        transaction,
      }
    );

    await transaction.commit();
    return res.status(200).json({
      status: true,
      msg: "Pedido registado",
      orderCreated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error en el servidor",
      status: false,
    });
  }
};

module.exports = {
  createOrder,
};
