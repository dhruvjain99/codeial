const User = require('../models/user');

//render the profile page
module.exports.profile = function(req, res){
    return res.render('profile', {
        title: "Profile",
    });
};

//render the sign-in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
};

//render the sign-up page
module.exports.signUp = function(req, res){
    // console.log(req.cookies);
    // res.cookie('hello', 'bye');
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
};

//Create a user 
module.exports.createUser = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("Error in finding user from database.");
            return;
        }

        if(!user){
            User.create(req.body, function(err, newUser){
                if(err){
                    console.log("Error in creating a user.");
                    return;
                }

                return res.redirect('/users/sign-in');
            });
        } else{
            return res.redirect('back');
        }
    });
};

module.exports.createSession = function(req, res){
    //TODO 
    return res.redirect('/');
};