const Movie = require('../models/Movie');

const getMovies = async (req, res) => {
 
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }};
const getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// 

const searchMovies = async (req, res) => {
    const { title, genre, year, cast } = req.query;

    let query = {};

    if (title) query.title = new RegExp(title, 'i');
    if (genre) query.genres = genre;
    if (year) query.year = year;
    if (cast) query.cast = { $in: cast.split(',') };

    try {
        const movies = await Movie.find(query);
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    

    module.exports = { getMovies,
    getMovie,
    searchMovies
     };