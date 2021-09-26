const express = require('express');

const { body } = require('express-validator');

const postsController = require('../controllers/posts');

const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', postsController.postPost);

router.put('/:name', postsController.updatePost);

router.get('/:name', postsController.fetchAll);


module.exports = router;