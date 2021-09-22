const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const UserController = require('../controllers/user');

router.get('/', UserController.UserAll);
router.get('/role', UserController.roles);

router.put('/:id', UserController.UpdateUser);
router.delete('/:id', UserController.DeleteUser);

module.exports = router;