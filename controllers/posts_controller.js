const Post = require('../models/post');
const Comment = require('../models/comment')

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

module.exports.destroyPost = function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log("Error in fetching post from the database for deletion");
            return;
        }

        //id stores the id of the object in String while _id stores it in ObjectId type
        if(post.user == req.user.id){
            post.remove();
            
            Comment.deleteMany({post: req.params.id}, function(err){
                if(err){
                    console.log("Coments cannot be deleted from the database");
                    return;
                }

                return res.redirect('back');
            });

        } else {
            return res.redirect('back');
        }

    });
}