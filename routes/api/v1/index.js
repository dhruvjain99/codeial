const express = require('express');
const router = express.Router();


router.use('/posts_api', require('./posts'));
router.use('/users_api', require('./users'));


module.exports = router;