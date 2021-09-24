const db = require('../models');
const Follow = db.follow;
// const User = db.user;

exports.create = async (req, res) => {
  const { followerId, followingId } = req.body;

  try {
    const count = await Follow.count({ where: { followerId, followingId } });

    if (count === 0) {
      await Follow.create({
        followerId,
        followingId,
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
    await Follow.destroy({ where: { id } });
  } catch (e) {
    res.status(500).send('error');
  }

  res.status(200).send('success');
};
