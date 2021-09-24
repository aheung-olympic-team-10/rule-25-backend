module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Must be a valid email address',
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      annualSaving: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      annualExpense: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      classMethods: {},
      tableName: 'user',
      freezeTableName: true,
      timestamps: false,
    }
  );

  return User;
};
