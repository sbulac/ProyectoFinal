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
        type: DataTypes.STRING(500),
        allowNull: 0,
      },
      email: {
        type: DataTypes.STRING(500),
        allowNull: 0,
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
      state: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
      },
    },
    {
      tableName: "client",
    }
  );

  Client.associate = (models) => {
    Client.hasMany(models.Orders, { foreignKey: "id_client" });
  };

  return Client;
};
