const router = require('express').Router();

const auth = require('../middlewares/auth');
const { ErrNotFound } = require('../errors/errors');
const { errNotFoundRouteMessage, errCrashServer } = require('../utils/errorsMessages');

// краш-тест
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(errCrashServer);
  }, 0);
});

router.use(require('./login'));

router.use(auth);

router.use(require('./userRoutes'));
router.use(require('./movieRoutes'));

router.use((req, res, next) => {
  next(new ErrNotFound(errNotFoundRouteMessage));
});

module.exports = router;
