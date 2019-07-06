const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.createComment = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let newComment = await Comment.create({
                content: req.body.comment,
                user: req.user._id,
                post: req.body.post
            });
        
            post.comments.push(newComment);
            post.save();
            req.flash('success', 'Comment added successfully.');
            return res.redirect('back');
        }
    } catch(err){
        req.flash('error', err);
        return;
    }      
}


module.exports.destroyComment = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);

        if(req.user.id == comment.user){
            let post_id = comment.post;
            
            comment.remove();
            
            // Pulling out and deleting a comment from the list of comment_ids
            let post = await Post.findByIdAndUpdate(post_id, { $pull: {comments: req.params.id}});
            req.flash('success', 'Comment deleted successfully.');
        }
        return res.redirect('back');
    } catch(err){
        req.flash('error', err);
        return;
    }
}