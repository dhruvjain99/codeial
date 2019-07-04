const Post = require('../models/post');
const Comment = require('../models/comment')

// createPost action to save a post in the database
module.exports.createPost = async function(req, res){
    try{
        let newPost = await Post.create({
            content: req.body.content,
            user: req.user.id
        });
        return res.redirect('back');
    } catch(err){
        console.log("Error :: " + err);
        return;
    }
};

module.exports.destroyPost = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        //id stores the id of the object in String while _id stores it in ObjectId type
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});
        }
        return res.redirect('back');
    } catch(err){
        console.log("Error :: " + err);
        return;
    }
}