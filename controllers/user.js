const db = require('../models');
const User = db.user;
const Follow = db.follow;

exports.findOne = async (req, res) => {
  const { id } = req.params;
  const { name, email, description } = await User.findOne({ where: { id } });

  const followerCount = await Follow.count({
    where: { followingId: id },
  }); // 해당 유저의 팔로워

  const followingCount = await Follow.count({
    where: { followerId: id },
  }); // 해당 유저가 팔로우 중인 사람

  res
    .status(200)
    .json({ name, email, description, followerCount, followingCount });
};

exports.getFollowers = async (req, res) => {
  const { id } = req.params;

  const followers = (
    await Follow.findAll({
      include: { all: true },
      where: { followingId: id },
    })
  ).map((row) => row.follower);

  res.status(200).json(followers);
};
