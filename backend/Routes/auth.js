const express = require('express');
const Router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../Models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const FRONTEND_URL=process.env.FRONTEND_URL
const success = false;
const JWT_SECRET = process.env.JWT_SECRET;
const SALT = Number(process.env.BCRYPT_SALT);

//Signup user   No login required
Router.post("/signup", [
    body('username', 'username can not be null').notEmpty(),
    body('email', 'Email can not be null').isEmail().notEmpty(),
    body('password', 'Password can not be null').notEmpty(),
], async (req, res) => {
    try {
        //checking wether the req body is valide or not
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.json({ success, error })
        }

        //check wether user already exists or not
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.json({ success, error: "User already exists" })
        }


        const password = bcrypt.hashSync(req.body.password, SALT);

        const creater_id = Date.now() + req.body.email;
        //adding user
        user = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: password,
            creater_id,
        })

        const data = {
            user: {
                id: user._id,
            },
        }

        //webtoken
        const authToken = jwt.sign(data, JWT_SECRET);


        return res.cookie('authToken', authToken, { httpOnly: true, sameSite: 'None', secure: true })
            .json({ success: true, user });

    } catch (error) {
        return res.json({ success, error })  //will change the error to internal server error
    }
})


//login

Router.post('/login', [
    body('email', 'Email can not be null').isEmail().notEmpty(),
    body('password', 'Password can not be null').notEmpty()
], async (req, res) => {
    try {
        //validating the input
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.json({ success, error });
        }

        //checking wether user exists 
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.json({ success, error: "Enter the correct cridentials" })
        }

        //check password is correct or not

        const password = await bcrypt.compare(req.body.password, user.password);

        if (!password) {
            return res.json({ success, error: "Enter the correct cridentials" });
        }
        const data = {
            user: {
                id: user._id,
            },
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        delete (user.password);
        console.log(user);
        return res.cookie('authToken', authToken, { httpOnly: true, sameSite: 'None', secure: true })
            .json({ success: true, user });
    } catch (error) {
        console.log(error)
        return res.json({ success, error })  //will change the error to internal server error

    }

})

//logout
Router.get('/logout', async (req, res) => {
    return res.clearCookie('authToken').end();
})


module.exports = Router;