const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const resetPasswordToken = require('../models/reset_password_token');
const crypto = require('crypto');
const resetPasswordMailer = require('../mailers/reset_password_mailer');

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
            let user = await User.findById(req.params.id); 
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log("*******Multer Error ::", err);
                    return;
                }

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    if(user.avatar && fs.existsSync(path.join(__dirname, "..", user.avatar))){
                        console.log('File EXISTS');
                        fs.unlinkSync(path.join(__dirname, "..", user.avatar));
                        console.log('OLD FILE DELETED');
                    }

                    user.avatar = User.avatarPath + req.file.filename;
                }
                user.save();
                req.flash('success', 'Profile updated successfully.'); 
                return res.redirect('back');
            });

        } else{
            return res.status(401).send("Unauthorized");
        }
    } catch(err){
        req.flash('error', err);
        return;
    }
}


//Render the forgot password page
module.exports.forgotPassword = function(req, res){
    return res.render('forgot_password', {
        title: "Codeial | Forgot Password",
    });
}

//Create reset password token and send Mail 
module.exports.generateResetPasswordToken = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});
        if(user){
            let resetTokenCode = crypto.randomBytes(20).toString('hex');
            let token = await resetPasswordToken.findOneAndUpdate({user: user}, {resetToken: resetTokenCode, isValid: true}, {new: true}).populate('user');
            if(!token){
                token = await resetPasswordToken.create({
                    user: user,
                    resetToken: resetTokenCode,
                    isValid: true
                }); 
            }  
            console.log(token);
            resetPasswordMailer.resetPassword(token);
            return res.redirect('/users/sign-in');

        } else{
            return res.redirect('/');
        }
    }catch(err){
        console.log("****************** Error", err);
        return;
    }
}

//Render reset password page
module.exports.resetPassword = async function(req, res){
    let token = await resetPasswordToken.findOne({resetToken: req.query.resetToken});
    if(token && token.isValid){
        return res.render('reset_password', {
            title: 'Codeial | Reset Password',
            resetToken: req.query.resetToken,
        });
    } else {
        return res.render('404_error', {
            title: 'Page Not Found'
        });
    }
}

//Update password and expire token
module.exports.updatePassword = async function(req, res){
    let token = await resetPasswordToken.findOne({resetToken: req.body.resetToken});
    if(token && token.isValid){
        if(req.body.newPassword == req.body.confirmPassword){
            let user = await User.findByIdAndUpdate(token.user, {password: req.body.newPassword}, {new: true});
            token.isValid = false;
            token.save();

            return res.redirect('/users/sign-in');
        } else {
            return;
        }
    } else {
        return res.render('404_error', {
            title: 'Page Not Found',
        });
    }
}