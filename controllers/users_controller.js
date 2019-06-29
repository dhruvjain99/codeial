const User = require('../models/user');

//render the profile page
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, profileUser){
        if(err){
            console.log("Error in fetching the profile of a user from the database");
            return;
        }

        return res.render('profile', {
            title: "Profile",
            profile_user:profileUser
        });

    });
    
};

//render the sign-in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }

    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
};

//render the sign-up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }


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
    return res.redirect('/');
};


module.exports.destroySession = function (req, res){
    req.logout();

    return res.redirect('/');
}

// Update the users details
module.exports.updateProfile = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, profileUser){
            if(err){
                console.log("Error in updating the profile information of the user");
                return;
            }

            return res.redirect('back');

        });
    } else{
        return res.status(401).send("Unauthorized");
    }
}