const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const authController = require('../controllers/auth');

router.post(
    '/signup', [
        body('name').trim().not().isEmpty(),
        body('username').trim().not().isEmpty()
        .withMessage('Please enter a valid username.')
        .custom(async(username) => {
            const user = await User.find(username);
            if (user[0].length > 0) {
                return Promise.reject('username address already exist!');
            }
        }),
        body('password').trim().isLength({ min: 7 }),
    ],
    authController.signup
);

router.post('/login', authController.login);


module.exports = router;