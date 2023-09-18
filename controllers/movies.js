/* eslint-disable no-unused-vars */
const Movie = require('../models/movie');

module.exports.getMoiveList = (req, res, next) => {
  const { _id } = req.user;

  // найти фильмы, где owner === _id
  // прокинуть ошибки
};

// Дописать
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
    .then(() => res.status(200).send({ message: 'Успех' }))

    .catch((err) => {
      next(err);
    });
};

// Доработать ошибки
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.body;

  Movie.findOneAndDelete({ movieId })
    .then((movie) => res.status(200).send({ movie }))
    .catch((err) => {
      next(err);
    });
};
