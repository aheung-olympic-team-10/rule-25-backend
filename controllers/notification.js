const db = require('../models');
const Notification = db.notification;
const Follow = db.follow;

exports.create = async (req, res) => {
  const { userId, content } = req.body;

  try {
    await Notification.create({
      userId,
      content,
    });
  } catch {
    res.status(500).send('error');
  }

  res.status(200).send('success');
};

exports.getFromFollowings = async (req, res) => {
  const { userId } = req.params;

  const followings = (
    await Follow.findAll({
      include: { all: true },
      where: { followerId: userId },
    })
  ).map((row) => row.followingId);

  const notifications = await Notification.findAll({
    include: { all: true, attributes: ['name', 'email'] },
    where: { userId: followings },
  });

  res.status(200).json(notifications);
};
