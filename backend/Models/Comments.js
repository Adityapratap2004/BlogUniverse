const mongoose =require('mongoose')

const comments=mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    blog:{
        type:mongoose.Types.ObjectId,
        ref:'Blog'
    },
    comment:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now(),
    }
})

const Comments=mongoose.model('Comments',comments)
module.exports=Comments