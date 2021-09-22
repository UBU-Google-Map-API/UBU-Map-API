const { validationResult } = require('express-validator');

const Map = require('../models/map');

exports.getMap = async(req, res, next) => {
    try {
        const [map] = await Map.getMAP();
        // console.log('MaP', map);
        res.status(200).json(map);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getProvince = async(req, res, next) => {
    try {
        const [Province] = await Map.getProvince();
        res.status(200).json(Province);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.getStatus = async(req, res, next) => {
    try {
        const [Status] = await Map.getStatus();
        res.status(200).json(Status);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};