const Post = require('../models/post');

// createPost action to save a post in the database
module.exports.createPost = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user.id
    }, function(err, newPost){
        if (err){
            console.log("Error creating a post in the database");
            return;
        }

        return res.redirect('back');
    });
};