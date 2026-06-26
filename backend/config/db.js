const mongoose =require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // this must come before using process.env

const mongo_URI = process.env.MONGO_URI
const connectDb =async()=>{

    try{    
        await mongoose.connect(mongo_URI);

        console.log("database connected successfully");

     
        
    }
    catch(err){
        console.log('error in connecting database',err);
        process.exit(1)
    }


}




module.exports={
    connectDb,
}