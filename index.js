const express = require('express');
const path = require('path');
const port = 8080;
const app = express();

//use the routes for handling requests 
app.use('/', require('./routes/index'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, function(err){
    if(err){
        console.log('Error occurred while firing up the server.');
        return;
    }
    console.log('Server is up and running on port :', port);
    return;
});