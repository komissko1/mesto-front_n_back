const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthorizationError = require('../errors/AuthorizationError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return (
          validator.isAlpha(v, 'en-US', { ignore: ' -' })
          || validator.isAlpha(v, 'ru-RU', { ignore: ' -' })
        );
      },
      message: 'Значение должно состоять из символов',
    },
    default: 'JacquesIvesCousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return (
          validator.isAlpha(v, 'en-US', { ignore: ' -' })
          || validator.isAlpha(v, 'ru-RU', { ignore: ' -' })
        );
      },
      message: 'Значение должно состоять из символов',
    },
    default: 'Researcher',
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => validator.isURL(v),
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Значение не соответствует адресу электронной почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByLoginData = function ({ email, password }) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return Promise.reject(new AuthorizationError('Пользователь не найден'));
    }
    return bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthorizationError('Пользователь не авторизован'));
        }
        return user;
      });
  });
};

module.exports = mongoose.model('user', userSchema);
