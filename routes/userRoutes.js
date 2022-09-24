const router = require('express').Router();
const { updateUserValidator } = require('../utils/validators');
const { getUserData, updateUserData } = require('../controllers/userControllers');

router.get('/users/me', getUserData);
router.patch('/users/me', updateUserValidator, updateUserData);

module.exports = router;
