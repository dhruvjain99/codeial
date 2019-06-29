const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/comments_controller');
const passport = require('passport');

// Create a route to create a new post
router.post('/create', passport.checkAuthentication, commentsController.createComment);
// Create a route to delete a comment
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroyComment);

module.exports = router;