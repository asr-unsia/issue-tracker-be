export default (sequelize, DataTypes) => {
  const Status = sequelize.define(
    "Status",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      timestamps: true,
    }
  );

  Status.associate = (models) => {
    Status.hasMany(models.Issue, {
      foreignKey: "statusId",
    });
  };

  return Status;
};
