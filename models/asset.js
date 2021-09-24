module.exports = (sequelize, Sequelize) => {
  const Asset = sequelize.define(
    'asset',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ticker: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      classMethods: {},
      tableName: 'asset',
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Asset;
};
