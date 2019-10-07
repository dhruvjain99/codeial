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
}

const production = {
    name: 'production',
}

module.exports = development;