const User = require('../models/user');

//render the profile page
module.exports.profile = function(req, res){
    //Authorizing user to access profile page
    //Check if token exists
    let userId = req.cookies.user_id;

    if(userId){
        User.findOne({_id: userId}, function(err, user){
            if(err){
                console.log("Error in finding the user.");
                return;
            }

            if(user){
                //If user exists, render the profile page with user info
                return res.render('profile', {
                    title: "Profile",
                    user: user
                });
            } else {
                //User does not exist, redirect to sign-in page
                return res.redirect('/users/sign-in')
            }
        });
    } else{
        //Token does not exist, redirect to sign-in page
        return res.redirect('/users/sign-in');
    }
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

//Create a session for sign-in
module.exports.createSession = function(req, res){
    //find the user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("Error in finding the user from the database.");
            return;
        }
        //Handle the user
        if(user){
            //Handle if the password mismatches
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            //Create a session for user
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        } else {
            //Handle user NOT present
            return res.redirect('back');
        }
    });
};


//Signing out
module.exports.signOut = function(req, res){
    res.clearCookie('user_id');
    return res.redirect('back');
};