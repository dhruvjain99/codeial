const User = require('../models/user');

//render the profile page
module.exports.profile = async function(req, res){
    try{
        let user = await User.findById(req.params.id);
        return res.render('profile', {
            title: "Profile",
            profile_user: user
        });
    } catch(err){
        console.log("Error in fetching the profile of a user from the database :: " + err);
        return;
    }
}

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
module.exports.createUser = async function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    try{
        let user = await User.findOne({email: req.body.email})
        if(!user){
            let newUser = await User.create(req.body);
            req.flash('success', 'Congratulations! Your account has been created.');
            return res.redirect('/users/sign-in');
        } else{
            req.flash('success', 'Your account already exists.');
            return res.redirect('back');
        }

    } catch(err){
        req.flash('error', err);
        return;
    }
}

module.exports.createSession = function(req, res){
    req.flash('success', 'Successfully logged in');

    return res.redirect('/');
};


module.exports.destroySession = function (req, res){
    req.logout();
    req.flash('success', 'You have logged out');

    return res.redirect('/');
}

// Update the users details
module.exports.updateProfile = async function(req, res){
    try{
        if(req.user.id == req.params.id){
            let user = await User.findByIdAndUpdate(req.params.id, req.body); 
            req.flash('success', 'Profile updated successfully.') 
            return res.redirect('back');
        } else{
            return res.status(401).send("Unauthorized");
        }
    } catch(err){
        req.flash('error', err);
        return;
    }
}