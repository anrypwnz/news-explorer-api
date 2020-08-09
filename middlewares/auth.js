const jwt = require('jsonwebtoken');
const UnathorizedErr = require('../errors/unathorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnathorizedErr('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'PhQIpzUmqk');
  } catch (err) {
    throw new UnathorizedErr('Необходима авторизация');
  }
  req.user = payload;
  return next();
};
