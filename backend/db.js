const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://navishaun13:navishaun2001@cluster0.zzepkrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongoose=()=>{
    mongoose.connect(MONGO_URI)
    .then(()=>console.log("Connected to mongodb succesfully"))
    .catch((err)=>console.log(err.message))
}

module.exports = connectToMongoose;