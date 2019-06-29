const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const passport = require('passport');


//[TODO - 1] Make a route for home page
router.get('/', homeController.home);

//[TODO - 2] Redirect all the other routes
router.use('/users', require('./users'));
router.use('/post', require('./posts'));
router.use('/comments', require('./comments'));

module.exports = router;