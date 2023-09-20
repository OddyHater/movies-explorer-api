const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');

// const linkPattern = /(https?:\/\/)(w{3}\.)?\w+[-.~:/?#[\]@!$&'()*+,;=]*#?/;

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

module.exports = {
  // users
  getCurrentUserValidataion,
  updateProfileValidation,
  createUserValidation,
  loginValidation,
  // users
};
