const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isUrl = require('validator/lib/isURL');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: [2, 'Не менее чем 2 символа'],
    maxlength: [30, 'Не более чем 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: false,
    minlength: [2, 'Не менее чем 2 символа'],
    maxlength: [30, 'Не более чем 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (link) => isUrl(link),
      message: 'Некорректный url',
    },
  },
  email: {
    type: String,
    required: [true, 'Обазательное поле'],
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: [true, 'Обазательное поле'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
