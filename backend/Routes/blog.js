const express = require('express');
const Router = express.Router();
const Blog = require("../Models/Blog");
const { body, validationResult } = require('express-validator');
const fetchUser = require('../Middleware/fetchUser');
const getDataUri = require('../Utils/dataUri');
const cloudinary = require('cloudinary')
const Category = require("../Models/Category");
const singlUpload = require('../Middleware/multer');
const User =require('../Models/User');




const success = false;

//get blog login not required

Router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find().populate('category', '_id category');
        return res.json({ success: true, blogs })
    } catch (error) {
        return res.json({ success, error });
    }
})

//get blog by specific id 

Router.get("/:id", async (req, res) => {
    try {
        const blogs = await Blog.findById(req.params.id).populate('category', '_id category').populate('user','_id username creater_id');
        if (!blogs) {
            return res.json({ success, error: "The blog doesn't exists" })
        }
        return res.json({ success: true, blogs })
    } catch (error) {
        return res.json({ success, error });
    }
})

//create blog //login required 

Router.post("/create", fetchUser, singlUpload,
    [
        body('title', 'There is no title of your blog').notEmpty(),
        body('content', 'There is no content in your blog').notEmpty(),
    ], async (req, res) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return res.json({ success, error });
            }

            //check the category exists are not
            console.log(req.body.category);
            const category = await Category.findById(req.body.category);
            if (!category) {
                return res.json({ success, error: "Category doesn't exist" })

            }
            const file = req.file;
            const fileUri = getDataUri(file);

            const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

            const b = await Blog.create({
                title: req.body.title,
                content: req.body.content,
                user: req.user.id,
                blogImg: {
                    imageId: mycloud.public_id,
                    imageUrl: mycloud.secure_url
                },
                category: category._id
            })

            const blog = await Blog.findById(b._id);

            //adding the blog in favourite table
            

            return res.json({ success: true, blog });
        } catch (error) {
            return res.json({ success, error })
        }
    })


//update blog //login required

Router.patch("/:id", fetchUser, singlUpload, async (req, res) => {
    try {
       
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.json({ success, error: "Blog doesn't exists" });
        }

        //checking the wether user is authorised

        if (blog.user != req.user.id) {
            return res.json({ success, error: "You can not edit this blog" })

        }
        let blogImg;
        if (req.file) {
            //check wether photo is already there or not if it is there then delete it and then update it
            if (blog.blogImg) {
                const request = await cloudinary.uploader.destroy(
                    blog.blogImg.imageId
                )
                
            }
            const fileUri = getDataUri(req.file);
            const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
            blogImg = {
                imageId: mycloud.public_id,
                imageUrl: mycloud.secure_url,
            }
        }
        else {
            blogImg = blog.blogImg;
        }
        
        //updating
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { ...req.body, blogImg }, { new: true });
        const updateBlog=await Blog.findById(updatedBlog._id).populate('category', '_id category').populate('user','_id username creater_id');
        
        return res.json({ success: true, updateBlog });
    } catch (error) {
        
        return res.json({ success, error });
    }

})

//delete blog  //login required

Router.delete("/:id", fetchUser, async (req, res) => {
    try {

        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.json({ success, error: "Blog doesn't exists" });
        }

        //checking the wether user is authorised

        if (blog.user != req.user.id) {
            return res.json({ success, error: "You can not delete this blog" })
        }

        //i have to remove it from fav of the users
        const x=await User.updateMany({$pullAll:{favourite:[req.params.id]}});             
        const request = await cloudinary.uploader.destroy(blog.blogImg.imageId);
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        return res.json({ success: true, deletedBlog });

    } catch (error) {
        console.log(error);
        return res.json({ success, error });
    }

})


module.exports = Router;