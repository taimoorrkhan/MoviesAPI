
const express = require('express');

const { getMovies, getMovie,searchMovies} = require('../controllers/moviesController');
const { validateMovieSearch, validateMovieId } = require('../utils/validators');

const router = express.Router();

router.get('/movies', getMovies);
router.get('/movies/search',validateMovieSearch ,searchMovies);
router.get('/movies/:id', validateMovieId,getMovie);




module.exports = router;
