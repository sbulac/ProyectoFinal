const { request, response } = require("express");
const { sequelieze, Products } = require("../models");
const validateToken = require("../helpers/validateRoleToken");

const getProducts = async (req = request, res = response) => {
  const transaction = await sequelieze.transaction();
  try {
    const products = await Products.findAll();
    const allProducts = products.filter((product) => {
      return product.toJSON().state !== 0;
    });

    await transaction.commit();
    return res.status(200).json(allProducts);
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return res.status(500).json({
      msg: "Error en el servidor",
      status: false,
    });
  }
};

const createProducts = async (req = request, res = response) => {
  const transaction = await sequelieze.transaction();

  try {
    const { name, price } = req.body;

    if (validateToken(req, res)) {
      return res
        .status(400)
        .send("No se tienen los permisos requeridos para esta accion");
    }

    if (!name && !price) {
      await transaction.rollback();
      return res.status(400).json({
        msg: "Todos los campos son obligatorios.",
        status: false,
      });
    }

    const userCreated = await Products.create(
      { name, price },
      {
        transaction,
      }
    );

    await transaction.commit();
    return res.status(200).json({
      status: true,
      msg: "Producto registado",
      userCreated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error en el servidor",
      status: false,
    });
  }
};

const updateProduct = async (req = request, res = response) => {
  const transaction = await sequelieze.transaction();
  try {
    const { name, price } = req.body;
    const { id } = req.params;

    if (validateToken(req, res)) {
      return res
        .status(400)
        .send("No se tienen los permisos requeridos para esta accion");
    }

    const productChanged = await Products.update(
      { name, price },
      { where: { id } }
    );
    await transaction.commit();
    return res.status(200).json({
      status: true,
      msg: "Producto actualizado",
      productChanged,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error en el servidor",
      status: false,
    });
  }
};

const disableProduct = async (req = request, res = response) => {
  const transaction = await sequelieze.transaction();
  try {
    const { id } = req.params;

    if (validateToken(req, res)) {
      return res
        .status(400)
        .send("No se tienen los permisos requeridos para esta accion");
    }

    const productChanged = await Products.update(
      { state: 0 },
      { where: { id } }
    );
    await transaction.commit();
    return res.status(200).json({
      status: true,
      msg: "Producto deshabilitado",
      productChanged,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error en el servidor",
      status: false,
    });
  }
};
const enableProduct = async (req = request, res = response) => {
  const transaction = await sequelieze.transaction();
  try {
    const { id } = req.params;

    if (validateToken(req, res)) {
      return res
        .status(400)
        .send("No se tienen los permisos requeridos para esta accion");
    }

    const productChanged = await Products.update(
      { state: 1 },
      { where: { id } }
    );
    await transaction.commit();
    return res.status(200).json({
      status: true,
      msg: "Producto habilitado",
      productChanged,
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
  getProducts,
  createProducts,
  updateProduct,
  disableProduct,
  enableProduct,
};
