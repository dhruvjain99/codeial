const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');


//Create the function to authenticate the user
passport.use(new LocalStrategy({
    usernameField: 'email'
}, function(email, password, done){
    // Find the user using the email received which is unique
    User.findOne({email: email}, function(err, user){
        if(err){
            console.log('Error in finding the user from the database.');
            done(err);
        }

        if(!user || user.password != password){
            console.log('Invalid email/password');
            return done(null, false);
        } else {
            return done(null, user);
        }

    });
}));

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    return done(null, user._id);
});

//De-serializing the user from the key in the cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding the user from the database.');
            return done(err);
        }

        return done(null, user);
    });
});

//Check if the user is authenticated
passport.checkAuthentication = function (req, res, next){
    //if user is authenticated then move on / pass the request to next usersController.action
    if (req.isAuthenticated()){
        return next();
    }

    //if user is not authenticated then pass the request to sign-in page
    return res.redirect('/users/sign-in');
};

//Send the authenticated user to locals to access the user in views
passport.setAuthenticatedUser = function (req, res, next){
    if (req.isAuthenticated()){
        res.locals.user = req.user;
    }

    return next();
};



module.exports = passport;