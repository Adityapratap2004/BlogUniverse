const mongoose=require('mongoose');

const category=mongoose.Schema({
    category:{
        type:String,
        required:true,
    },
    categoryImg:{
        imgId:{
            type:String,
        },
        imgUrl:{
            type:String,
        }
    },
    title:{
        type:String
    }
    
})
const Category=mongoose.model('Category',category);

module.exports=Category;