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

            newComment = await Comment.findById(newComment._id).populate('user');
            let commentCreated = {
                _id: newComment._id,
                content: newComment.content,
                post: newComment.post,
                user: {
                    name: newComment.user.name
                }
            }

            req.flash('success', 'Comment added successfully.');

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment: commentCreated,
                        flash: {
                            'success': req.flash('success')
                        }
                    },
                    message: 'Comment created'
                });
            }

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

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id,
                        flash: {
                            'success': req.flash('success')
                        }
                    },
                    message: 'Comment deleted'
                });
            }

        }
        return res.redirect('back');
    } catch(err){
        req.flash('error', err);
        return;
    }
}