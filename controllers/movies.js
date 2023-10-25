/* eslint-disable no-unused-vars */
const Movie = require('../models/movie');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const PermissionError = require('../errors/permission-err');

module.exports.getMoiveList = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .then((films) => {
      if (!films) {
        throw new NotFoundError('Ошибка. Фильм не найден');
      }
      res.status(200).send({ message: films });
    })
    .catch(() => {
      next(new BadRequestError('Something is wrong'));
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const userId = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: userId,
    movieId,
    nameRU,
    nameEN,
  })
    .then((film) => res.status(200).send({ message: film }))

    .catch((err) => {
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.body;
  const { _id } = req.user;

  Movie.findOneAndDelete({ movieId })
    .then((movie) => {
      if (!movie) {
        throw new BadRequestError('Фильм с таким id не найден');
      }
      if (movie.owner !== _id) {
        throw new PermissionError('Ошибка доступа. Вы не можете удалить этот фильм');
      }
      res.status(200).send({ movie });
    })
    .catch((err) => {
      next(err);
    });
};
