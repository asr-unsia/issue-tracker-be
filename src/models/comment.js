export default (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      issueId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
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

  Comment.associate = (models) => {
    Comment.belongsTo(models.Issue, {
      foreignKey: "issueId",
    });
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
    });
  };

  return Comment;
};
