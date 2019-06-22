const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to the database :: MongoDB'));

db.once('open', function(){
    console.log('Successfully connected to the database :: MongoDB');
});

module.exports = db;