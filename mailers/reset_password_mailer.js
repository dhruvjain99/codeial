const nodeMailer = require('../config/nodemailer');

exports.resetPassword = function(token){
    nodeMailer.transporter.sendMail({
        from: 'contact@codeial.com',
        to: token.user.email,
        subject: 'Reset Password Alert',
        html: `Hi ${token.user.name}, click on <a href="http://3.81.100.153:3000/users/reset-password?resetToken=${token.resetToken}">http://localhost:8000/users/reset-password?resetToken=${token.resetToken}</a> to reset your password.`
    }, function(err, info){
        if(err){
            console.log('Error in sending reset password mail', err);
            return;
        }
        console.log(info);
        return;
    })
}