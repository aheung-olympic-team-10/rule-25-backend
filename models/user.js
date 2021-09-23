module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'user',
    {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
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
    },
    {
      classMethods: {},
      tableName: 'user',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  return User;
};
