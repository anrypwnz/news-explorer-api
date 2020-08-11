const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ConflictErr = require('../errors/conflict-err');
const BadRequestErr = require('../errors/bad-request-err');
const UnathorizedErr = require('../errors/unathorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user.js');

const createUser = async (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  await User.find({ email }).then((data) => {
    try {
      if (data.length !== 0) {
        throw new ConflictErr('Пользователь с таким Email уже существует');
      } else if (!name || !password) {
        throw new BadRequestErr('Неподходящие данные');
      } else {
        bcrypt.hash(password, 10)
          .then((hash) => User.create({
            email, password: hash, name,
          }))
          .then((user) => res.send({ message: `Пользователь ${user.name} с почтой ${user.email} успешно зарегистрирован.` }))
          .catch((err) => next(err));
      }
    } catch (err) {
      next(err);
    }
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'PhQIpzUmqk', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      next(new UnathorizedErr('Ошибка авторизации'));
    });
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      const { email, name } = user;
      res.send({ email, name });
    })
    .catch((err) => next(err));
};

module.exports = {
  createUser, login, getMe,
};
