const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

// валидатор для ссылок
function urlValidator(value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.message(`${value} не является ссылкой`);
}

// валидирование емал и пароля для логина пользователя
const loginUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// валидирование емал, пароля для регистрации пользователя
const registerUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// валидирование емал и имени для обновления данных пользователя
const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

//  валидирование данных при создании нового фильма
const addMoviesValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValidator),
    trailerLink: Joi.string().required().custom(urlValidator),
    thumbnail: Joi.string().required().custom(urlValidator),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

//  валидирование данных при удалении фильма
const deleteMoviesValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  loginUserValidator,
  registerUserValidator,
  updateUserValidator,
  addMoviesValidator,
  deleteMoviesValidator,
};
