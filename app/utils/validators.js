const { body, param, query, validationResult } = require('express-validator');


const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// let code  registerValidator

const validateRegister = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    handleValidationErrors
];
//login

const validateLogin = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors
];

//movies validators below

const validateMovieId = [
    param('id').isMongoId().withMessage('Invalid movie ID'),
    handleValidationErrors
];


const validateMovieSearch = [
    query('title').optional().isString().withMessage('Title must be a string'),
    query('genre').optional().isString().withMessage('Genre must be a string'),
    query('year').optional().isInt({ min: 1900, max: new Date().getFullYear() })
        .withMessage('Year must be a valid number between 1900 and the current year'),
    query('cast').optional().isString().withMessage('Cast must be a string'),
    handleValidationErrors
];

module.exports = {
    validateRegister,
    validateLogin,
    validateMovieId,
    validateMovieSearch
};