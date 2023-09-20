/* eslint-disable no-unused-vars */
const Movie = require('../models/movie');

const BadRequestError = require('../errors/bad-request-err');

module.exports.getMoiveList = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .then((films) => {
      if (!films) {
        throw new BadRequestError('Something is wrong');
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

  Movie.create({
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
  })
    .then((film) => res.status(200).send({ message: film }))

    .catch((err) => {
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.body;

  Movie.findOneAndDelete({ movieId })
    .then((movie) => {
      if (!movie) {
        throw new BadRequestError('Фильм с таким id не найден');
      }
      res.status(200).send({ movie });
    })
    .catch((err) => {
      next(err);
    });
};
