require('dotenv').config();
const mongoose = require('mongoose');


const db = mongoose.connect(process.env.MONGO_URI);

db.then(() => {
    console.log('Connected to MongoDB');
});
db.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});


module.exports = db;
// This code connects to a MongoDB database using Mongoose, logging success or error messages.