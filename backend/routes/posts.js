const express = require('express');

const { body } = require('express-validator');

const postsController = require('../controllers/posts');

const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', postsController.postPost);

router.put('/:name', postsController.updatePost);

router.get('/:name', postsController.fetchAll);

// router.get('/post/:id', (req, res) => {
//         const { id } = req.params
//         console.log(id);
//         // const result = products.find(product => product.id === id)
//         res.json({ message: 'Hello World' });
//     })


// router.get('/:id', auth, postsController.fetchAll);

// router.post(
//   '/',
//   [
//     auth,
//     body('title').trim().isLength({ min: 5 }).not().isEmpty(),
//     body('body').trim().isLength({ min: 10 }).not().isEmpty(),
//     body('user').trim().not().isEmpty(),
//   ],
//   postsController.postPost
// );

// router.delete('/:id', auth, postsController.deletePost);

module.exports = router;