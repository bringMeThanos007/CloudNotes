const mongoose =require('mongoose');


const mongoURL = "mongodb+srv://dalviaman7:Dellpassword%402@cluster0.zfjjxv9.mongodb.net/?retryWrites=true&w=majority";

// const mongoURI = "mongodb://localhost:27017/cloudnotebook";

const connectToMongoose = ()=>{
    mongoose.connect(mongoURL, ()=>{
        console.log("successfully connected");
    })
}

module.exports = connectToMongoose;