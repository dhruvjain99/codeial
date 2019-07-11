const express = require('express');
const router = express.Router();


router.use('/posts_api', require('./posts'));


module.exports = router;