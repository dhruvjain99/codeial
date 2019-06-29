const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.createComment = function(req, res){
    Post.findById(req.body.post, function(err, post){
        if(err){
            console.log("There is no such post exists to comment in the database");
            return;
        }   
        
        if(post){
            Comment.create({
                content: req.body.comment,
                user: req.user._id,
                post: req.body.post
            }, function(err, newComment){
                if(err){
                    console.log("Error in saving a comment in the database");
                    return;
                }
        
                post.comments.push(newComment);
                post.save();
        
                return res.redirect('back');
        
            });
        }        

    });
    
};