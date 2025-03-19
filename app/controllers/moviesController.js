const Movie = require('../models/Movie');

const getMovies = async (req, res) => {
 
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }};


    module.exports = { getMovies };