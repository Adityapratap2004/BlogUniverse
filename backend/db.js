const mongoose=require('mongoose');

const connectDb=async()=>{
    
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Database connected successfully");
    })
    .catch((error)=>{
        console.log("Database not connected",error);
    })

}

module.exports=connectDb;