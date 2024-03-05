const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const { keyToken } = require("../config");
const { sequelieze, Client } = require("../models");
const { validPassword } = require("../helpers/bycriptPassword");

const createClient = async (req = request, res = response) => {
  const transaction = await sequelieze.transaction();
  try {
    const { nombre, email, numero, password } = req.body;

    if (!nombre && !email && !password) {
      await transaction.rollback();
      return res.status(400).json({
        msg: "Todos los campos son obligatorios.",
        status: false,
      });
    }

    const userCreated = await Client.create(
      { name: nombre, email, phone: numero, password },
      {
        transaction,
      }
    );

    await transaction.commit();
    return res.status(200).json({
      status: true,
      msg: "Usuario registado",
      userCreated,
    });
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return res.status(500).json({
      msg: "Error en el servidor",
      status: false,
    });
  }
};

const login = async (req = request, res = response, next) => {
  try {
    const { email, password } = req.body;
    const user = await Client.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ msg: "Usuario no encontrado", status: false });
    }

    const userData = user?.toJSON();
    const passwordHash = userData.password;

    if (!validPassword(password, passwordHash)) {
      return res.status(404).json({
        msg: "La contraseña es incorrecta",
        status: false,
      });
    }

    const token = jwt.sign({ id: userData.id }, keyToken);

    return res.json({ token, status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error en el servidor", status: false });
  }
};

const disableClient = async (req = request, res = response) => {
  const transaction = await sequelieze.transaction();
  try {
    const { id } = req.params;

    const disableClient = await Client.update(
      { state: 0 },
      { where: { id } }
    );
    await transaction.commit();
    return res.status(200).json({
      status: true,
      msg: "Cliente deshabilitado",
      disableClient,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error en el servidor",
      status: false,
    });
  }
};
const enableClient = async (req = request, res = response) => {
  const transaction = await sequelieze.transaction();
  try {
    const { id } = req.params;

    const disableClient = await Client.update(
      { state: 1 },
      { where: { id } }
    );
    await transaction.commit();
    return res.status(200).json({
      status: true,
      msg: "Cliente habilitado",
      disableClient,
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
  createClient,
  login,
  disableClient,
  enableClient,
};
