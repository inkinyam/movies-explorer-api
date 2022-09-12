const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUserData, updateUserData } = require('../controllers/userControllers');

router.get('/users/me', getUserData);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
}), updateUserData);

module.exports = router;
