require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const { CREATED, OK } = require('../utils/statuses');

const { SECRETKEY, NODE_ENV } = process.env;
const { PRODACTION_SECRET_KEY, JWT_LIFE_LENGTH, SALT_LENGTH } = require('../utils/config');
const { ErrBadRequest, ErrConflict, ErrNotFound } = require('../errors/errors');

// регистрация нового пользователя
const registerUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, SALT_LENGTH)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(CREATED).send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ErrBadRequest({ message: 'Вы указали некорректные данные при создании пользователя' }));
        return;
      }
      if (err.code === 11000) {
        next(new ErrConflict('Пользователь с таким email уже существует'));
        return;
      }
      next(err);
    });
};

// авторизация пользователя и возвращение jwt
const loginUser = (req, res, next) => {
  const {
    email, password,
  } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? SECRETKEY : 'secret',
        { expiresIn: '7d' },
      );
      res.status(OK).send({ jwt: token });
    })
    .catch(next);
};

// получаем информацию о пользователе
const getUserData = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new ErrNotFound('Пользователь с указанным _id не найден'));
      }
      return res.status(OK).send(user);
    })
    .catch(next);
};

// обновляем имя и емаил пользователя
const updateUserData = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new ErrNotFound('Пользователь с указанным _id не найден'));
      }
      return res.status(OK).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrBadRequest('Вы указали некорректные данные при обновлении данных пользователя'));
        return;
      }
      next(err);
    });
};

module.exports = {
  registerUser,
  loginUser,
  getUserData,
  updateUserData,
};
