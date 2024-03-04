module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "Client",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        tupe: DataTypes.STRING(500),
        allowNull: 0,
      },
      email: {
        type: DataTypes.STRING(500),
        allowNull,
      },
      phone: {
        type: DataTypes.STRING(500),
        allowNull: 0,
        unique: 1,
      },
      password: {
        type: DataTypes.STRING(500),
        allowNull: 0,
      },
    },
    {
      tableName: "client",
    }
  );

  return Client;
};
