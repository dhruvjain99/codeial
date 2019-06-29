const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts_controller');
const passport = require('passport');

// Create a route to create a new post
router.post('/create', passport.checkAuthentication, postsController.createPost);
// Create a route to delete a post
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroyPost);

module.exports = router;