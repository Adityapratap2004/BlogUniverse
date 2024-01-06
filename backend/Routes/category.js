const express=require('express');
const fetchUser = require('../Middleware/fetchUser');
const Category = require('../Models/Category');
const singlUpload = require('../Middleware/multer');
const Router=express.Router();
const cloudinary=require('cloudinary');
const getDataUri = require('../Utils/dataUri');

//add category

const success=false;

Router.post('/',fetchUser,singlUpload,async(req,res)=>{
    try {
        
        //GETTING THE CATEGORY
        const cat=await Category.findOne({category:{$regex:req.body.category,$options:"i"}});
        if(cat){
            return res.json({success,error:`category already exists as ${cat.category}`})
        }

        //uploading photo
        const fileUri= getDataUri(req.file);
        const mycloud=await cloudinary.v2.uploader.upload(fileUri.content);

        //adding in the database 
        const category=await Category.create({
            category:req.body.category,
            categoryImg:{
                imgId:mycloud.public_id,
                imgUrl:mycloud.secure_url,
            },
            title:req.body.title
        })

        return res.json({success:true,category});
        
    } catch (error) {
        console.log(error);
        return res.json({success,error:"Internal server error"});
        
    }
})

//get category

Router.get("/",async(req,res)=>{
    try {
        const category=await Category.find();
        return res.json({success:true,category});
        
    } catch (error) {
        console.log(error);
        return res.json({success,error:"Internal server error"});                
    }
})

module.exports=Router
