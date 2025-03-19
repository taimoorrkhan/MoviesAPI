const express = require('express');

const { addNewMovie,deleteMovie } = require('../controllers/adminControllers');

const router = express.Router();


router.post('/addMovie', addNewMovie);
router.delete('/deleteMovie/:id', deleteMovie);




module.exports = router;