const db = require('../models');
const AccountBook = db.accountBook;

exports.findAll = async (req, res) => {
  const { userId } = req.params;

  const accountBooks = await AccountBook.findAll({
    where: {
      userId,
    },
  });

  res.json(accountBooks);
};

exports.findAllWithLimit = async (req, res) => {
  const { userId, limit } = req.params;

  const accountBooks = await AccountBook.findAll({
    where: {
      userId,
    },
    limit,
  });

  res.json(accountBooks);
};

exports.create = async (req, res) => {
  const { userId, amount, type, category, date, content } = req.body;

  try {
    await AccountBook.create({
      userId,
      amount,
      type,
      category,
      date,
      content,
    });
  } catch {
    res.status(500).send('error');
  }

  res.status(200).send('success');
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { type, category, date, content } = req.body;

  try {
    await AccountBook.update(
      {
        type,
        category,
        date,
        content,
      },
      { where: { id } }
    );
  } catch {
    res.status(500).send('error');
  }

  res.status(200).send('success');
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    await AccountBook.destroy({ where: { id } });
  } catch {
    res.status(500).send('error');
  }

  res.status(200).send('success');
};
