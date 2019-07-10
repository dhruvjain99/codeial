const Post = require('../models/post');
const Comment = require('../models/comment')

// createPost action to save a post in the database
module.exports.createPost = async function(req, res){
    try{
        let newPost = await Post.create({
            content: req.body.content,
            user: req.user.id
        });

        newPost = await Post.findById(newPost._id).populate('user');
        
        let postCreated = {
            _id: newPost._id,
            content: newPost.content,
            user: {
                name: newPost.user.name
            }
        };
        
        req.flash('success', 'Post created successfully');

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: postCreated,
                    flash: {
                        'success': req.flash('success')
                    }
                },
                message: 'Post created!'
            });
        }

        return res.redirect('back');
    } catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
};

module.exports.destroyPost = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        //id stores the id of the object in String while _id stores it in ObjectId type
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});

            req.flash('success', 'Post and comments deleted successfully.');

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id,
                        flash: {
                            'success': req.flash('success')
                        }
                    },
                    message: 'Post deleted'
                });
            }


        }
        return res.redirect('back');
    } catch(err){
        req.flash('error', err);
        return;
    }
}