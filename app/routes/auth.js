const express = require('express');
const userReg = require('../controllers/authController');
const router = express.Router();


router.post('/register', userReg);

module.exports = router;