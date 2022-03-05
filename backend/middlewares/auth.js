const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new AuthorizationError('Пользователь не авторизован'));
  }
  let payload;
  try {
    payload = jwt.verify(token, 'JWT_KEY');
  } catch (err) {
    return next(new AuthorizationError('Пользователь не авторизован'));
  }
  req.user = payload;
  return next();
};
