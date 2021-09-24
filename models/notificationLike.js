module.exports = (sequelize, Sequelize) => {
  const NotificationLike = sequelize.define(
    'notificationLike',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      notificationId: {
        type: Sequelize.INTEGER,
      },
      likeUserId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      classMethods: {},
      tableName: 'notificationLike',
      freezeTableName: true,
      timestamps: false,
    }
  );

  return NotificationLike;
};
