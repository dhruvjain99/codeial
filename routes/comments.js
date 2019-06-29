const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/comments_controller');
const passport = require('passport');

// Create a route to create a new post
router.post('/create', passport.checkAuthentication, commentsController.createComment);


module.exports = router;