require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const app = express();

const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;
const { DB_CONN = 'mongodb://localhost:27017/news-explorer' } = process.env;

// const whitelist = {
//   origin: ['http://localhost:8080', 'http://84.201.134.251', 'https://84.201.134.251',
//     'https://top-news.ml', 'http://top-news.ml', 'https://www.top-news.ml',
//     'http://www.top-news.ml', 'https://api.top-news.ml', 'http://api.top-news.ml',
//     'https://www.api.top-news.ml', 'http://www.api.top-news.ml', 'https://anrypwnz.github.io/', 'http://anrypwnz.github.io/'],
//   credentials: true,
//   methods: 'GET, POST, DELETE',
// };
// const corsOptions = {
//   origin(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };
// app.use(cors(corsOptions));

app.use(helmet());
mongoose.connect(DB_CONN, {
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
app.use(limiter);

app.use(routes.articles);
app.use(routes.users);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.all('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
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
