const express = require('express');

const { addNewMovie,deleteMovie ,updateMovie} = require('../controllers/adminControllers');

const router = express.Router();


router.post('/addMovie', addNewMovie);
router.delete('/deleteMovie/:id', deleteMovie);
router.put('/updateMovie/:id', updateMovie);




module.exports = router;