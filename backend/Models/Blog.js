const mongoose=require('mongoose');

const blog=mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
    },
    date:{
        type:Date,
        default:Date.now(),
    },
    blogImg:{
        imageId:{
            type:String,
        },
        imageUrl:{
            type:String
        },
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'Category',
        required:true
    },
    comments:{
        type:[mongoose.Types.ObjectId],
        ref:'Comments'
    }

})

const Blog=mongoose.model('Blog',blog);
module.exports=Blog;