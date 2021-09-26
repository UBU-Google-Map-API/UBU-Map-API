const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.UserAll = async(req, res, next) => {
    try {
        const [user] = await User.getAllUser();
        res.status(200).json(user);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.roles = async(req, res, next) => {
    try {
        const [role] = await User.allRoles();
        res.status(200).json(role);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


exports.UpdateUser = async(req, res, next) => {

    const id = req.params.id;
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        // console.log("hashedPassword", hashedPassword);
        // console.log("password", password);
        const USER = {
            name: name,
            username: username,
            password: hashedPassword,
        };

        const data = await User.UpdateUser(id, USER);
        res.status(200).json({ message: 'User Updated' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.DeleteUser = async(req, res, next) => {
    const id = req.params.id;
    try {
        const data = await User.DeleteUser(id);
        res.status(200).json({ message: 'Delete User' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};