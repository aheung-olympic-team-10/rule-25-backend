const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const yahooFinance = require('yahoo-finance');

const db = require('../models');
const User = db.user;
const Follow = db.follow;
const Asset = db.asset;
const AccountBook = db.accountBook;

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

const getPrice = (ticker, exchangeRate, amount) => {
  return new Promise((resolve, reject) =>
    yahooFinance.quote(
      {
        symbol: ticker,
        modules: ['price'],
      },
      (err, quotes) => {
        if (err) reject(err);

        const currentPrice = quotes.price.regularMarketPrice;
        const realER = quotes.price.currency === 'USD' ? exchangeRate : 1;

        resolve(currentPrice * realER * amount);
      }
    )
  );
};

exports.getFire = async (req, res) => {
  const { id } = req.params;

  yahooFinance.quote(
    {
      symbol: 'KRW=X',
      modules: ['price'],
    },
    async (err, quotes) => {
      if (err) {
        req.send(err);
        return;
      }

      const currentPrice = quotes.price.regularMarketPrice;

      const assets = await Asset.findAll({ where: { userId: id } });
      const accountBooks = await AccountBook.findAll({ where: { userId: id } });

      const assetsPrice = (
        await Promise.all(
          assets.map((row) => getPrice(row.ticker, currentPrice, row.amount))
        )
      ).reduce((acc, cur) => acc + cur, 0);

      const accountBooksPrice = accountBooks.reduce(
        (acc, cur) => acc + cur.get().amount,
        0
      );

      const totalAsset = assetsPrice + accountBooksPrice;

      const user = await User.findOne({ where: { id } });
      const initialFirePeriod = (user.annualExpense * 25) / user.annualSaving;
      const remainFirePeriod =
        (user.annualExpense * 25 - totalAsset) / user.annualSaving;

      res.json({
        totalAsset,
        initialFirePeriod,
        remainFirePeriod,
      });
    }
  );
};

exports.searchUser = async (req, res) => {
  const { keyword } = req.params;

  const filteredUsers = await User.findAll({
    where: {
      name: {
        [db.Sequelize.Op.like]: `%${keyword}%`,
      },
    },
  });

  res.json(filteredUsers);
};
