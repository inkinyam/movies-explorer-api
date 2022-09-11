const Movie = require('../models/movieModel');
const { CREATED, OK } = require('../utils/statuses');

const {
  ErrBadRequest, ErrNotFound, ErrForbidden,
} = require('../errors/errors');

// создаем новую карточку фильма
const addMovies = (req, res, next) => {
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
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(CREATED).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrBadRequest('Вы указали некорректные данные при создании фильма'));
        return;
      }
      next(err);
    });
};

// получаем все фильмы
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.status(OK).send(movies);
    })
    .catch(next);
};

// получаем конкретную карточку по id
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new ErrNotFound('Фильм с указанным _id не найден');
    })
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ErrForbidden('Нельзя удалить фильм, который был добавлен не Вами'));
      }
      return Movie.deleteOne(movie)
        .then(() => {
          res.status(OK).send(movie);
        });
    })
    .catch(next);
};

module.exports = {
  getMovies,
  addMovies,
  deleteMovie,
};
