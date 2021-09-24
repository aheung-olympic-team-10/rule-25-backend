module.exports = (sequelize, Sequelize) => {
  const AccountBook = sequelize.define(
    'accountBook',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('income', 'expenditure'),
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
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
      tableName: 'accountBook',
      freezeTableName: true,
      timestamps: false,
    }
  );

  return AccountBook;
};
