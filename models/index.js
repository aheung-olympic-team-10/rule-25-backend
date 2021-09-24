const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize, Sequelize);
db.notification = require('./notification')(sequelize, Sequelize);
db.asset = require('./asset')(sequelize, Sequelize);
db.accountBook = require('./accountBook')(sequelize, Sequelize);
db.follow = require('./follow')(sequelize, Sequelize);
db.notificationLike = require('./notificationLike')(sequelize, Sequelize);

// 관계 정의
db.notification.belongsTo(db.user, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
db.asset.belongsTo(db.user, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
db.accountBook.belongsTo(db.user, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
db.follow.belongsTo(db.user, {
  foreignKey: 'followingId',
  as: 'following',
  onDelete: 'CASCADE',
});
db.follow.belongsTo(db.user, {
  foreignKey: 'followerId',
  as: 'follower',
  onDelete: 'CASCADE',
});
db.notificationLike.belongsTo(db.notification, {
  foreignKey: 'notificationId',
  onDelete: 'CASCADE',
});
db.notificationLike.belongsTo(db.user, {
  foreignKey: 'likeUserId',
  as: 'likeUser',
  onDelete: 'CASCADE',
});

module.exports = db;
