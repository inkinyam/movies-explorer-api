const router = require('express').Router();
const { loginUserValidator, registerUserValidator } = require('../utils/validators');
const { loginUser, registerUser } = require('../controllers/userControllers');

router.post('/signin', loginUserValidator, loginUser);
router.post('/signup', registerUserValidator, registerUser);

module.exports = router;
