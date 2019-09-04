const nodeMailer = require('../config/nodemailer');

exports.newComment = function(comment){
    let htmlTemplate = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: 'contact@codeial.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: htmlTemplate
    }, function(err, info){
        if(err){
            console.log("Error in sending new comment email using nodemailer", err);
            return;
        }

        console.log(info);
        return;
    });
}