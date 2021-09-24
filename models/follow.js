module.exports = (sequelize, Sequelize) => {
  const Follow = sequelize.define(
    'follow',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      followerId: {
        type: Sequelize.INTEGER,
      },
      followingId: {
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
      tableName: 'follow',
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Follow;
};
