const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

//Handle the request for profile i.e. creates a route profile
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);

//Handle the request for sign-in i.e. creates a route sign-in
router.get('/sign-in', usersController.signIn);

//Handle the request for sign-up i.e. creates a route sign-up
router.get('/sign-up', usersController.signUp);

//Create a route for creating a new user
router.post('/create-user', usersController.createUser);

//Create a route to sign-in
router.post('/create-session', passport.authenticate(
    'local', 
    {failureRedirect: '/sign-in'}
    ), usersController.createSession);

// Create a route to sign-out
router.get('/sign-out', usersController.destroySession);

// Create a route to update the users profile details
router.post('/update/:id', passport.checkAuthentication, usersController.updateProfile);

//Create a route for google authentication 
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

//Create a route for callback URL for google authentication
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/sign-in'}), usersController.createSession);

//Create a route to forgot-password
router.get('/forgot-password', usersController.forgotPassword); 

//Create a route for generation of reset-password-token-mail
router.post('/reset-password-token', usersController.generateResetPasswordToken);

//Create route to reset password
router.get('/reset-password', usersController.resetPassword);

//create a route to change password
router.post('/change-password', usersController.updatePassword);

module.exports = router;