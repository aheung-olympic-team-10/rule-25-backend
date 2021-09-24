const yahooFinance = require('yahoo-finance');

const db = require('../models');
const Asset = db.asset;

const getPrice = (ticker, data) => {
  return new Promise((resolve, reject) =>
    yahooFinance.quote(
      {
        symbol: ticker,
        modules: ['price'],
      },
      (err, quotes) => {
        if (err) reject(err);

        const currentPrice = quotes.price.regularMarketPrice;
        resolve({
          ...data,
          profitRate: (currentPrice / data.price) * 100 - 100,
          currentPrice,
        });
      }
    )
  );
};

exports.findAll = async (req, res) => {
  const { userId } = req.params;

  const assets = (
    await Asset.findAll({
      where: {
        userId,
      },
    })
  ).map((row) => {
    return getPrice(row.ticker, row.get());
  });

  res.json(await Promise.all(assets));
};

exports.create = async (req, res) => {
  const { userId, ticker, price, amount } = req.body;

  const isExisting =
    (await Asset.count({
      where: {
        userId,
        ticker,
      },
    })) > 0;

  if (isExisting) {
    res.status(400).send('already exists');
    return;
  }

  yahooFinance.historical({
    symbol: ticker,
  });

  yahooFinance.quote(
    {
      symbol: ticker,
      modules: ['price', 'summaryDetail'],
    },
    async (err, quotes) => {
      if (err) {
        res.status(400).send('invalid ticker');
        return;
      }

      if (!quotes?.price?.regularMarketPrice) {
        res.status(400).send('no regular market price');
        return;
      }

      if (!quotes?.price?.currency) {
        res.status(400).send('only usd or krw');
        return;
      }

      await Asset.create({
        userId,
        ticker: quotes?.price?.symbol,
        price,
        amount,
        currency: quotes?.price?.currency,
        name: quotes?.price?.shortName || quotes?.price?.symbol,
      });

      res.status(200).send('success');
    }
  );
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { ticker, price, amount } = req.body;

  try {
    await Asset.update(
      {
        ticker,
        price,
        amount,
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
    await Asset.destroy({ where: { id } });
  } catch {
    res.status(500).send('error');
  }

  res.status(200).send('success');
};
