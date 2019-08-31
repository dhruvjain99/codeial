const jwt = require('jsonwebtoken');

const User = require('../../../models/user');

//Action to create session for API request to return JSON web token
module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});
        if(user && (user.password == req.body.password)){
            return res.json(200, {
                message: 'Signed In successfully, keep the token safe.',
                data: {
                    token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '600000'})
                }
            })
        } else{
            return res.json(422, {
                message: 'Incorrect username or password.'
            });
        }
    }catch(err){
        console.log('****************** Error ', err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}