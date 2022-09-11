const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUserData, updateUserData } = require('../controllers/userControllers');

router.get('/me', getUserData);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
}), updateUserData);

module.exports = router;
