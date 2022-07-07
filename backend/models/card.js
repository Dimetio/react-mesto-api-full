const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Введите имя'],
    minlength: [2, 'Не менее чем 2 символа'],
    maxlength: [30, 'Не более чем 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Нужная ссылка'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Ты кто такой ваще?'],
    ref: 'user',
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
