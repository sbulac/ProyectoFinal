module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "Products",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: 1,
      },
      price: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
      state: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
      },
    },
    {
      tableName: "products",
    }
  );

  return Products;
};
