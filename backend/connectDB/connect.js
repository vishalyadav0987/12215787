const mongoose = require('mongoose');

const connectDB = async(MONGO_URI)=>{
    mongoose.connect(MONGO_URI).then(()=>{
        console.log('Database Succesfully coNNECTED');
    }).catch((error)=>{
        console.log('Error connecting to database',error.message);
    })
}


module.exports = connectDB