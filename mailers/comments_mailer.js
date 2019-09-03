const nodeMailer = require('../config/nodemailer');

exports.newComment = function(comment){
    nodeMailer.transporter.sendMail({
        from: 'contact@codeial.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: '<h1>Yup! New Comment Posted. Congratulations!</h1>'
    }, function(err, info){
        if(err){
            console.log("Error in sending new comment email using nodemailer", err);
            return;
        }

        console.log(info);
        return;
    });
}