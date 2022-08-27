// Code used to connect to database

const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/mynotes"

const connectToDb= ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('Connected to Database Successfully ');
    })
}

module.exports=connectToDb;

