const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const env = require('./environment');

const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret_key,
    callbackURL: env.google_callback_url,
}, function(accessToken, refreshToken, profile, done){
    User.findOne({email: profile.emails[0].value}, function(err, user){
        if(err){
            console.log('Error in finding the user from the database.');
            return done(null, false);
        }
        console.log(profile);
        if(user){
            return done(null, user);
        } else {
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, newUser){
                if(err){
                    console.log('Error in creating a new user(Sign up using google).');
                    return done(null, false);
                }
                return done(null, newUser);
            });
        }
    })
}));

module.exports = passport;