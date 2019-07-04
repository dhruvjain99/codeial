const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res){
    try{
        let allPosts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments', 
            populate: {
                path: 'user'
            }
        });
        
        let allUsers = await User.find({});
    
        return res.render('home', {
            title: "Home",
            posts: allPosts,
            all_users: allUsers
        });
    } catch(err){
        console.log("Error :: " + err);
        return;
    }
}
