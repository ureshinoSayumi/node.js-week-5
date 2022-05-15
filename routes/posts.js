var express = require('express');
var router = express.Router();
const postController = require('../controllers/post')

/* GET users listing. */
router.get('', postController.getAllPosts);
router.get('/:id', postController.getPost);
router.post('/', postController.createPost);
router.patch('/:id', postController.updatePost);
router.delete('/', postController.deleteAllPost);

module.exports = router;
