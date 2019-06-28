const express = require('express');
const router = express.Router();

const postController = require('../controllers/post_controller');
const passport = require('passport');

// Create a route to create a new post
router.post('/create', passport.checkAuthentication, postController.createPost);


module.exports = router;