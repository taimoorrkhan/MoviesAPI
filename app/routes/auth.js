const express = require('express');
const { userReg, userLogin } = require('../controllers/authController');
const { validateRegister } = require('../utils/validators');
const router = express.Router();


router.post('/register',validateRegister, userReg);
router.post('/login', userLogin);

module.exports = router;