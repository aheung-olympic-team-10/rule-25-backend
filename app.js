const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// 환경변수 로드
require('dotenv').config();

// 라우터
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const notificationRouter = require('./routes/notification');
const assetRouter = require('./routes/asset');
const accountBookRouter = require('./routes/accountBook');
const followRouter = require('./routes/follow');
const notificationLikeRouter = require('./routes/notificationLike');

const app = express();

const db = require('./models');
db.sequelize.sync();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/notifications', notificationRouter);
app.use('/assets', assetRouter);
app.use('/account-books', accountBookRouter);
app.use('/follows', followRouter);
app.use('/notification-likes', notificationLikeRouter);

// 404 핸들링
app.use((req, res, next) => {
  res.status(404).send('404 not found.');
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
