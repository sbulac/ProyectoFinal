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
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: 1,
      },
      password: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(500),
        allowNull: false,
        defaultValue: "client",
        validate: {
          isIn: [["admin", "client"]],
        },
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
