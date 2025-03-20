const express = require('express');

const { addNewMovie,deleteMovie ,updateMovie} = require('../controllers/adminControllers');
const authenticateAdmin = require('../utils/adminAuth');

const router = express.Router();


router.post('/addMovie',authenticateAdmin, addNewMovie);
router.delete('/deleteMovie/:id',authenticateAdmin, deleteMovie);
router.put('/updateMovie/:id',authenticateAdmin, updateMovie);




module.exports = router;