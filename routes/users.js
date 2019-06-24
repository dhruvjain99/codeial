const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

//Handle the request for profile i.e. creates a route profile
router.get('/profile', usersController.profile);

//Handle the request for sign-in i.e. creates a route sign-in
router.get('/sign-in', usersController.signIn);

//Handle the request for sign-up i.e. creates a route sign-up
router.get('/sign-up', usersController.signUp);

//Create a route for creating a new user
router.post('/create-user', usersController.createUser);

//Create a route to create session for sign-in
router.post('/create-session', usersController.createSession);

//Create a route to sign-out
router.post('/sign-out', usersController.signOut);

module.exports = router;