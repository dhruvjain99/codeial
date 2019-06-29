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


module.exports.destroyComment = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(err){
            console.log("Error in finding the comment to be deleted from the database");
            return;
        }

        if(req.user.id == comment.user){
            
            let post_id = comment.post;
            
            comment.remove();
            // Pulling out and deleting a comment from the list of comment_ids
            Post.findByIdAndUpdate(post_id, { $pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            });
        } else{
            return res.redirect('back');
        }

    });
}