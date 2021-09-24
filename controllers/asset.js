const db = require('../models');
const Asset = db.asset;
const User = db.user;

exports.findAll = async (req, res) => {};

exports.create = async (req, res) => {
  const { userId, ticker, price, amount } = req.body;

  try {
    await Asset.create({
      userId,
      ticker,
      price,
      amount,
    });
  } catch {
    res.status(500).send('error');
  }

  res.status(200).send('success');
};

exports.update = async (req, res) => {};

exports.delete = async (req, res) => {};
