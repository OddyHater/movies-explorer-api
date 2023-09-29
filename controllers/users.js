const bcrypt = require('bcrypt');
const User = require('../models/user');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const EmailError = require('../errors/email-err');

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new BadRequestError('Пользователь по указанному _id не найден.');
      } else {
        next(err);
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateProfile = (req, res, next) => { // PATCH
  const { name, email } = req.body;
  if (!name || !email) {
    throw new BadRequestError('Переданы некорректные данные при обновлении профиля.');
  }
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при обновлении профиля.');
      } else if (err.code === 11000) {
        throw new EmailError('Пользователем с таким email уже существует');
      } else {
        next(err);
      }
    })
    .catch((err) => {
      next(err);
    });
};

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res, next) => { // POST
  const
    {
      email,
      password,
      name,
    } = req.body;

  if (!email || !password) {
    return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
  }

  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then(() => res.status(201).send({
          data: {
            email,
            name,
          },
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new EmailError('Пользователем с таким email уже существует'));
          } else if (err.name === 'ValidationError') {
            throw new BadRequestError('Переданы некорректные данные при обновлении профиля.');
          }
          return next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};
