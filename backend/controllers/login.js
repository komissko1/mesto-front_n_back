const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthorizationError = require('../errors/AuthorizationError');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByLoginData({ email, password })
    .then((user) => {
      if (!user) { throw new AuthorizationError('Неверные данные пользователя'); }
      const token = jwt.sign(
        { _id: user._id },
        'JWT_KEY',
        {
          expiresIn: '7d',
        },
      );
      return res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          secure: true,
        })
        .status(201).send({
          user,
          message: 'Вход совершен',
        });
    })
    .catch(next);
};
