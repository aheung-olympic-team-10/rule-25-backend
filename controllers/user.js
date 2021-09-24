const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;
const Follow = db.follow;

const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '48h',
  });
};

exports.auth = async (req, res) => {
  const { email, password } = req.body;
  const hashed = crypto.createHash('sha512').update(password).digest('base64');

  const user = await User.findOne({ where: { email } });

  if (user.password === hashed) {
    res.send(createToken(user.get()));
  } else {
    res.send('invalid');
  }
};

exports.create = async (req, res) => {
  const { name, email, password, annualSaving, annualExpense } = req.body;

  const isExisting =
    (await User.count({
      where: { email },
    })) > 0;

  if (isExisting) {
    res.send('already exsits');
    return;
  }

  const hashed = crypto.createHash('sha512').update(password).digest('base64');

  try {
    await User.create({
      name,
      email,
      password: hashed,
      description: '',
      annualSaving,
      annualExpense,
    });
  } catch (e) {
    res.send(e);
    return;
  }

  res.send('success');
};

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

exports.getFollowings = async (req, res) => {
  const { id } = req.params;

  const followings = (
    await Follow.findAll({
      include: { all: true },
      where: { followerId: id },
    })
  ).map((row) => row.following);

  res.status(200).json(followings);
};
