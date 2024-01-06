const mongoose=require('mongoose');

const user=mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profileImg:{
        unique_Id:{
            type:String
        },
        imgUrl:{
            type:String
        },
        
    },
    creater_id:{
        type:String,
        required:true,

    },
    favourite:{
        type:[mongoose.Types.ObjectId],
        ref:'Blog'
    }

})

const User=mongoose.model('User',user);
module.exports=User;