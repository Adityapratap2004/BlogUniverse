const express = require('express');
const Router = express.Router();
const fetchUser = require('../Middleware/fetchUser');
const singleUpload = require('../Middleware/multer')
const cloudinary = require("cloudinary");
const User = require("../Models/User");
const getDataUri = require('../Utils/dataUri');
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');




const SALT = Number(process.env.BCRYPT_SALT)
const success = false;

//get user
Router.get('/', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.json({ success, error: "User doesn't exists" });
        }

        return res.json({ success: true, user });

    } catch (error) {
        console.log(error)
        return res.json({ success, error });

    }
})


//update user
Router.patch('/', fetchUser, singleUpload, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.json({ success, error: "User doesn't exist" })
        }

        //check wether the entered email is same with other user

        if (req.body.email) {
            const userEmail = await User.findOne({ _id: { $ne: req.user.id }, email: req.body.email });
            if (userEmail) {
                return res.json({ success, error: "This email is connected with other account" });
            }

        }

        let password = undefined;
        if (req.body.password) {

            password = bcrypt.hashSync(req.body.password, SALT);
            console.log("password", password);
        }
        console.log("uaha tak to chala")
        //for photo

        let profileImg;
        if (req.file) {
            console.log("ye to file mai aa gaye")
            //check wether profile photo exist if exists then delete it from cloudinary and then add new prfoile
            //photo init to the cloudinary and then update in the monogdb
            if (user.profileImg.unique_Id) {
                console.log("profile Imf", user.profileImg)
                console.log("Delete karne pahcuh gaya")
                const request = await cloudinary.uploader.destroy(user.profileImg.unique_Id);
            }
            const fileUri = getDataUri(req.file);
            const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
            profileImg = {
                unique_Id: mycloud.public_id,
                imgUrl: mycloud.secure_url,
            }
        }
        else {
            profileImg = user.profileImg;
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id, { ...req.body, profileImg, password }, { new: true })
        return res.json({ success: true, updatedUser });
    } catch (error) {
        console.log(error)
        return res.json({ success, error });
    }


})

//delete user

Router.delete('/', fetchUser, async (req, res) => {
    try {

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.json({ success, error: "User Doesn't exists" });
        }

        //deleting progile photo
        if (user.profileImg.unique_Id) {
            const request = await cloudinary.uploader.destroy(user.profileImg.unique_Id);
        }

        //deleting the user
        const deleteduser = await User.findByIdAndDelete(req.user.id);
        return res.json({ success: true, deleteduser });

    } catch (error) {
        console.log(error);
        return res.json({ success, error: "Internal server error" });
    }
})

//add favourite

Router.post('/:id', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.json({ success, error: "User doesn't exist" })
        }

        const blogId = new mongoose.Types.ObjectId(req.params.id);
        //check wehter the blog is already there in the favourite

        const f = user.favourite;
        for (let i in f) {
            if (f[i] == req.params.id) {
                return res.json({ success, error: "This blog is already added to your favourite" })
            }
        }

        //updating favourite 


        const updatedUser = await User.findByIdAndUpdate(req.user.id,
            { $push: { favourite: blogId } }, { new: true }
        );

        return res.json({ success: true, updatedUser });


    } catch (error) {
        console.log(error);
        return res.json({ success, error: "Internal server error" });
    }


})

Router.get("/favourite_blogs", fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.json({ success, error: "User doesn't exists" });
        }

        const favblogs = await User.findById(req.user.id).select('favourite').populate({ path: 'favourite', populate: { path: 'category', select: '_id category' } });
        return res.json({ success: true, favblogs });
    } catch (error) {
        console.log(error);
        return res.json({ success, error });
    }
})


module.exports = Router
