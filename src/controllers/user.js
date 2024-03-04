const { request, response } = require("express");
const { sequielize, Users: userModel } = require("../models");
const { keyToken } = require("../config");
const jwt = require("jsonwebtoken");
const { validPassword } = require("../helpers/bycriptPassword");

const creatUser = async (req = request, resp = response) => {
  const transaction = await sequielize.transaction();
  try {
    const { nombre, email, password, profile } = req.body;

    if (!nombre && !email && !password) {
      await transaction.rollback();
      return resp.status(400).json({
        msg: "Todos los campos son obligatorios.",
        status: false,
      });
    }

    const userCreated = await userModel.create(
      { nombre, email, password, profile },
      {
        transaction,
      }
    );

    await transaction.commit();
    return resp.status(200).json({
      status: true,
      msg: "Usuario registado",
      userCreated,
    });
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return resp.status(500).json({
      msg: "Error en el servidor",
      status: false,
    });
  }
};

const login = async (req = request, res = response, next) => {
  try {
    const { email, passwrod } = req.body;
    const user = await userModel.findOne({
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

module.exports = {
  creatUser,
  login,
};
