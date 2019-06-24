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
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
};