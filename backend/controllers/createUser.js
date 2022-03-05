const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UserExistsError = require('../errors/UserExistsError');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return next(new UserExistsError('Пользователь с таким мейлом уже существует'));
      }
      return bcrypt.hash(password, 12);
    })
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => {
        res.status(200).send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        });
      })
      .catch(next));
};
