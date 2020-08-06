require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const app = express();
app.use(helmet());
// const users = require('./routes/users');
// const articles = require('./routes/articles');
const { users, articles } = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/news-explorer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Successful connection to DataBase');
});
mongoose.connection.on('error', (err) => {
  console.log('error', err);
  process.exit(1);
});

app.use(requestLogger);

app.use(users);
app.use(articles);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.all('*', (req, res, next) => {
  res.status(404).send({ 'message': 'Запрашиваемый ресурс не найден' });
  next();
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(PORT, () => console.log('Connected to port:', PORT));

// TODO api should work new.ru/api
