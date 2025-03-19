
const Movie = require('../models/Movie.js');
const {  validationResult } = require('express-validator');



const addNewMovie =  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, year, cast, genres, extract, thumbnail, thumbnail_width, thumbnail_height } = req.body;

    try {
        const movie = new Movie({
            title,
            year,
            cast,
            genres,
            extract,
            thumbnail,
            thumbnail_width,
            thumbnail_height
        });

        await movie.save();
        res.status(201).json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = { addNewMovie };