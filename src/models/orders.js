module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    "Orders",
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
      id_products: {
        type: DataTypes.BIGINT(500),
        allowNull: 0,
        unique: 1,
      },
      password: {
        type: DataTypes.STRING(500),
        allowNull: 0,
      },
    },
    {
      tableName: "orders",
    }
  );

  return Orders;
};
