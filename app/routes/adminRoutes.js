const express = require('express');

const { addNewMovie } = require('../controllers/adminControllers');

const router = express.Router();


router.post('/addMovie', addNewMovie);


module.exports = router;