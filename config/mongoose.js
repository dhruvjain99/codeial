const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`, {useNewUrlParser: true, useCreateIndex: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to the database :: MongoDB'));

db.once('open', function(){
    console.log('Successfully connected to the database :: MongoDB');
});

module.exports = db;