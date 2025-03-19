
const express = require('express');

const { getMovies, getMovie} = require('../controllers/moviesController');

const router = express.Router();

router.get('/movies', getMovies);
router.get('/movies/:id', getMovie);




module.exports = router;
