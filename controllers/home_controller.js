const Post = require('../models/post');
const User = require('../models/user');

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

        User.find({}, function(err, usersList){
            if(err){
                console.log("Error in fetching the list of users from the database");
                return;
            }
            return res.render('home', {
                title: "Home",
                posts: postsList,
                all_users: usersList
            });
    
        });

        
    });
    
};
