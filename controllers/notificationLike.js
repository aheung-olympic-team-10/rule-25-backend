const db = require('../models');
const NotificationLike = db.notificationLike;

exports.create = async (req, res) => {
  const { notificationId, likeUserId } = req.body;

  try {
    const count = await NotificationLike.count({
      where: { notificationId, likeUserId },
    });

    if (count === 0) {
      await NotificationLike.create({
        notificationId,
        likeUserId,
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }

  res.status(200).send('success');
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    await NotificationLike.destroy({ where: { id } });
  } catch (e) {
    res.status(500).send('error');
  }

  res.status(200).send('success');
};
