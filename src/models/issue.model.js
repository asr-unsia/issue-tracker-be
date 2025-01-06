export default (sequelize, DataTypes) => {
  const Issue = sequelize.define(
    "Issue",
    {
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      requesterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      resolverId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      timestamps: true,
    }
  );

  Issue.associate = (models) => {
    Issue.belongsTo(models.Status, {
      foreignKey: "statusId",
    });
    Issue.belongsTo(models.User, {
      foreignKey: "requesterId",
      as: "requester",
    });
    Issue.belongsTo(models.User, {
      foreignKey: "resolverId",
      as: "resolver",
    });
  };

  return Issue;
};
