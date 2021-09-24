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
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
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
