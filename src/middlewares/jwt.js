const jwt = require("jsonwebtoken");
const { response, request } = require("express");
const config = require("../config");

module.exports = (req = request, res = response, next) => {
  const token = req.headers["access-token"];
  try {
    if (!token) {
      return res.status(500).json({ msg: "Not provided token" });
    }
    // Verificar el user con jwt (token, keyToken, callback)
    jwt.verify(token, config.keyToken, (err, decoded) => {
      if (err) {
        return res.status(500).json({ msg: "Invalid token" });
      }

      req.decode = decoded;
      next();
    });
  } catch (error) {
    res.status(400).json({ msg: "Error al validar token" });
  }
};
