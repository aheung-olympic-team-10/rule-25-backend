module.exports = (sequelize, Sequelize) => {
  const Notification = sequelize.define(
    'notification',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      classMethods: {},
      tableName: 'notification',
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Notification;
};
