const express = require('express');

const router = express.Router();

const mapController = require('../controllers/map');

router.get('/', mapController.getMap);
router.get('/Province', mapController.getProvince);
router.get('/Status', mapController.getStatus);

module.exports = router;