module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    "Orders",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      id_client: {
        type: DataTypes.BIGINT(20),
        allowNull: 0,
      },
      id_products: {
        type: DataTypes.JSON,
        allowNull: 0,
      },
      state: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
      },
    },
    {
      tableName: "orders",
    }
  );

  Orders.associate = (models) => {
    Orders.belongsTo(models.Client, { foreignKey: "id_client" });
  };

  return Orders;
};
