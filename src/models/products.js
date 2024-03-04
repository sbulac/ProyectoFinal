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
        tupe: DataTypes.STRING(500),
        allowNull: 0,
      },
      price: {
        type: DataTypes.BIGINT(20),
        allowNull,
      },
      password: {
        type: DataTypes.STRING(500),
        allowNull: 0,
      },
    },
    {
      tableName: "products",
    }
  );

  return Products;
};
