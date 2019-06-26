const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const port = 8080;
const app = express();


//Parse the post requests
app.use(express.urlencoded());

//Parse the cookie received with every request
app.use(cookieParser());

//setup static files access
app.use(express.static('./assets'));
// extract styles and script tags from sub-pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// use express ejs layouts
app.use(expressLayouts);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//Setup the express-session to encrypt the key
app.use(session({
    name: 'Codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100),
    }
}));

//Tell app to use passport for authentication
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use the routes for handling requests 
app.use('/', require('./routes/index'));

 
app.listen(port, function(err){
    if(err){
        console.log('Error occurred while firing up the server.');
        return;
    }
    console.log('Server is up and running on port :', port);
    return;
});