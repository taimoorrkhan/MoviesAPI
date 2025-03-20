
const express = require('express');

const { getMovies, getMovie,searchMovies} = require('../controllers/moviesController');

const router = express.Router();

router.get('/movies', getMovies);
router.get('/movies/search', searchMovies);
router.get('/movies/:id', getMovie);




module.exports = router;
