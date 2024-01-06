const express = require('express');
const Blog = require('../Models/Blog');
const Comments = require('../Models/Comments');
const { body, validationResult } = require('express-validator')
const Router = express.Router();
const fetchUser = require('../Middleware/fetchUser')


const success = false;
Router.get("/:id", async (req, res) => {
    try {
        //phele check kr blog hai ki nahi
        //hai to usko bhej do bu itna hi karna hai
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(400).json({ success, error: "Blog doesn't exit" })
        }

        const comment = await Comments.find({ blog: req.params.id }).populate("user", "_id username profileImg")

        return res.json({ success: true, comment })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success, error: "Internal server error" });

    }
})

Router.post("/:id", [
    body('comment', 'Comment can not be null').notEmpty()
], fetchUser, async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ success, error: error.array() })
    }

    try {
        //check wether blog exist or not
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(400).json({ error: "Blog doesn't exit" })
        }
        //check wether you have already reviewd
        let comment = await Comments.findOne({ user: req.user.id, blog: req.params.id });
        if (comment) {
            return res.json({ success, error: "You havealready commented on this post" })
        }
        //no we can add the comment
        comment = await Comments.create({
            user: req.user.id,
            comment: req.body.comment,
            blog: req.params.id
        })

        //now we add this comment in blog
        const addingIntoBlog = await Blog.findOneAndUpdate(blog._id, { $push: { "comments": comment._id } })

        comment = await Comments.findById(comment._id).populate('user', '_id username profileImg');
        return res.json({ success: true, comment });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success, error: "Internal server error" });
    }
})

module.exports = Router;