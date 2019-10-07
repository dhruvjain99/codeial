const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logsDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logsDirectory) || fs.mkdirSync(logsDirectory);

const accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logsDirectory
})

const development = {
    name: 'development',
    assets_path: '/assets',
    session_secret_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'dhruv.jain93',
            pass: 'baby2560##'
        }
    },
    google_client_id: '138446774075-u72veioq6hsfmjauqa1f1a8ctt213tnr.apps.googleusercontent.com',
    google_client_secret_key: '3cS-drfvhz8YxV5-wBYKrR_8',
    google_callback_url: 'http://localhost:3000/users/auth/google/callback',
    jwt_secret_key: 'codeial',
    morgan: {
        mode: 'dev',
        options: {
            stream: accessLogStream
        }
    }
}

const production = {
    name: 'production',
}

module.exports = development;