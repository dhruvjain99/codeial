const express = require('express');
const router = express.Router();
const posts_controller = require('../../../controllers/api/v1/posts_api');

router.get('/', posts_controller.index);

router.delete('/:id', posts_controller.destroy);


module.exports = router;