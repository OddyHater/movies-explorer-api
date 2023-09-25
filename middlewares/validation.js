const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');

const linkPattern = /(https?:\/\/)(w{3}\.)?\w+[-.~:/?#[\]@!$&'()*+,;=]*#?/;

// users
const getCurrentUserValidataion = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().custom((value, helper) => {
      if (mongoose.isValidObjectId(value)) {
        return value;
      }
      return helper.message('ID is not correct');
    }),
  }).unknown(),
});

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }).unknown(),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }).unknown(),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
});
// users

// movies
const getMovieListValidation = celebrate({
  params: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required(),
    }).unknown(),
  }).unknown(),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkPattern),
    trailerLink: Joi.string().required().pattern(linkPattern),
    thumbnail: Joi.string().required().pattern(linkPattern),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }).unknown(),
  params: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required(),
    }).unknown(),
  }).unknown(),
});

const deleteMovieValidation = celebrate({
  body: Joi.object().keys({
    owner: Joi.number().required(),
  }).unknown(),
});
// movies

module.exports = {

  // users
  getCurrentUserValidataion,
  updateProfileValidation,
  createUserValidation,
  loginValidation,
  // users

  // movies
  getMovieListValidation,
  createMovieValidation,
  deleteMovieValidation,
  // movies
};
