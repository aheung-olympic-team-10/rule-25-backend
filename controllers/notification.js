const db = require('../models');
const Notification = db.notification;
const User = db.user;

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
