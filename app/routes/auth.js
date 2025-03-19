const express = require('express');
const { userReg, userLogin } = require('../controllers/authController');
const router = express.Router();


router.post('/register', userReg);
router.post('/login', userLogin);

module.exports = router;