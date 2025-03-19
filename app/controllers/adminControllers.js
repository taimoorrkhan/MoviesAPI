
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

const updateMovie = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        try {
            const movie = await Movie.findById(req.params.id);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }
    
            const { title, year, cast, genres, extract, thumbnail, thumbnail_width, thumbnail_height } = req.body;
    
            movie.title = title;
            movie.year = year;
            movie.cast = cast;
            movie.genres = genres;
            movie.extract = extract;
            movie.thumbnail = thumbnail;
            movie.thumbnail_width = thumbnail_width;
            movie.thumbnail_height = thumbnail_height;
    
            await movie.save();
            res.json(movie);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    

}




module.exports = { addNewMovie };