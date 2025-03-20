const express = require('express');
const { userReg, userLogin } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../utils/validators');
const router = express.Router();


router.post('/register',validateRegister, userReg);
router.post('/login', validateLogin,userLogin);

module.exports = router;