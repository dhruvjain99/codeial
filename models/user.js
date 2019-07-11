const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars/');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function(req, file, callBack){
        callBack(null, path.join(__dirname,"..",AVATAR_PATH));
    },
    filename: function(req, file, callBack){
        callBack(null, file.fieldname+"-"+Date.now());
    }
});


userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const user = mongoose.model('User', userSchema);

module.exports = user;