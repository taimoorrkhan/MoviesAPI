
const express = require('express');

const { getMovies, } = require('../controllers/moviesController');

const router = express.Router();

router.get('/movies', getMovies);


module.exports = router;
