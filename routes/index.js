const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const passport = require('passport');


//[TODO - 1] Make a route for home page
router.get('/', homeController.home);

//[TODO - 2] Redirect all the other routes
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

// Redirect all the api requests to index.js of api
router.use('/api', require('./api')); // require('./api') will make request to require('./api/index'), we could have directly mentioned './api/index' as well, it automatically searches for index file.

module.exports = router;