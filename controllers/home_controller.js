const Post = require('../models/post');

module.exports.home = function (req, res){
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments', 
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, postsList){
        if(err){
            console.log("Error in fetching all the posts from the database.");
            return;
        }

        return res.render('home', {
            title: "Home",
            posts: postsList
        });

    });
    
};
