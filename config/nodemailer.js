const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'dhruv.jain93',
        pass: 'baby2560##'
    }
});

let renderTemplate = function(data, relativePath){
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailer', relativePath),
        data,
        function(err, newTemplate){
            if(err){
                console.log('Error in rendering email template ::', err);
                return;
            }
            mailHTML = newTemplate;
            return mailHTML;
        }
    )
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}