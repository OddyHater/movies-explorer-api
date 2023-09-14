require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходимо авторизироваться. Отсутствует токен');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new AuthError('Необходимо авторизироваться. Неверный токен');
  }

  req.user = payload;

  return next();
};
