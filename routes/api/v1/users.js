const express = require('express');
const router = express.Router();

const userController = require('../../../controllers/api/v1/users_api');

//Route to create a session for api request after identifying user and then returning jwt
router.post('/create-session', userController.createSession);


module.exports = router;