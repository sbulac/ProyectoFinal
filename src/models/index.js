const Sequelize = require("sequelize");
const {
  nameDb,
  portDb,
  userDb,
  passwordDb,
  hostDb,
} = require("../config/index");

const fs = require("fs");
const path = require("path"); // path de la carpeta, nativo de node

const baseName = path.basename(__filename);
const db = {};

const sequelieze = new Sequelize(nameDb, userDb, passwordDb, {
  dialect: "mysql",
  port: portDb,
  host: hostDb,
  logging: false,
});

const listFile = fs.readdirSync(__dirname).filter((file) => {
  // return de todos los archivos js que no sean el index
  return (
    file.indexOf(".") !== 0 && file !== baseName && file.slice(-3) === ".js"
  );
});

listFile.forEach((file) => {
  const model = require(path.join(__dirname, file))(
    sequelieze,
    Sequelize.DataTypes
  );

  db[model.name] = model;
});

Object.keys(db).forEach((model) => {
  if (db[model].associate) {
    db[model].associate(db);
  }
});

db.sequelieze = sequelieze;
db.Sequelize = Sequelize;

sequelieze.sync({});

module.exports = db;
