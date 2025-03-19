const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    cast: [{
        type: String,
        required: true
    }],
    genres: [{
        type: String,
        required: true
    }],
    extract: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    thumbnail_width: {
        type: Number,
        required: true
    },
    thumbnail_height: {
        type: Number,
        required: true
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
