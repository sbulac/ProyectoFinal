const jwt = require("jsonwebtoken");
const { response, request } = require("express");
const { keyToken } = require("../config");

module.exports = (req = request, res = response, next) => {
  const token = req.headers["access-token"];
  try {
    if (!token) {
      return res.status(500).json({ msg: "Not provided token" });
    }
    // Verificar el user con jwt (token, keyToken, callback)
    jwt.verify(token, keyToken, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Invalid token" });
      }

      req.decode = decoded;
      // req.ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      next();
    });
  } catch (error) {
    res.status(400).json({ msg: "Error al validar token" });
  }
};
