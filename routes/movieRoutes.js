const router = require('express').Router();

const { addMoviesValidator, deleteMoviesValidator } = require('../utils/validators');
const { getMovies, addMovies, deleteMovie } = require('../controllers/movieControllers');

router.get('/movies', getMovies);
router.post('/movies', addMoviesValidator, addMovies);
router.delete('/movies/:_id', deleteMoviesValidator, deleteMovie);

module.exports = router;
