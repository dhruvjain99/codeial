const express = require('express');
const router = express.Router();
const posts_controller = require('../../../controllers/api/v1/posts_api');

const passport = require('passport');

router.get('/', posts_controller.index);

router.delete('/:id', passport.authenticate('jwt', {session: false}),posts_controller.destroy);


module.exports = router;