const User = require("../models/user/userModel")
const Image = require('../models/media/imageModel')
const bcrypt = require("bcrypt")
const {createUser , userExists} = require('./user/createUser')
const jwt = require('jsonwebtoken')
const log = require('../helpers/logRequest')
const sendEmail = require('../foreignAPIs/emailConfirmation')
const emailToken = require('../models/user/emailTokenModel')
const fs = require('fs')
const path = require("path")
require('dotenv').config()




const getUser = async (req, res) => {
    const user = await User.findOne({ email: req.user.email })
    if (user) {
        res.status(200).json({ user: user })
    } else {
        res.status(400).json({ user: {}, message: "forbidden" })
    }
}
const signUp = async (req, res) => {
    log(req)
    // extract user information from request's body//
    const newUser = createUser(req)
    
    if (await userExists(newUser.email)) {

        if (req.file !== undefined) {
            fs.unlinkSync(req.file.path)
        }
        res.json({ message: 'User Already Exists' })
    } else {
        const data = await user.save()

        const token = new emailToken({
            user: data._id,
            token: await bcrypt.genSalt(8)
        })
        const savedToken = await token.save()
        if (savedToken.token) {

        }
        //console.log(encodeURIComponent(savedToken.token))
        //const url = "https://" + req.hostname + "/api/user/confirmemail?token=" + encodeURIComponent(savedToken.token)
        //await sendEmail({ "email": 'sohilerashid4@gmail.com', "name": "Sohile Yor Dad" }, { "email": data.email, "name": data.name }, url)
        res.status(201).json(data)

    }



}




const updateUser = (req, res) => {
    res.send('user updated')
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email || password)) {
            res.status(400).send('All input is required');
        }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {
                    sub: user._id, email: user.email, status: user.status, role: "shopkeeper"

                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "3h",
                }
            );
            res.status(201).json({ token })
        } else {
            res.status(400).json({ message: "incorrect email and password" })
        }
    } catch (err) {
        console.log(err)

    }
}

const confirmEmail = async (req, res) => {
    const tokenId = decodeURIComponent(req.query.token)
    if (tokenId) {
        emailToken.findOne({ token: tokenId }, (err, token) => {
            if (err || !token) {
                res.status(404).json({ message: "No such thing exists :-)" })
            } else {
                User.findOneAndUpdate({ _id: token.user, status: "pending" }, { status: "verified" }, async (error, user) => {
                    if (error || !user) {
                        res.status(400).json({ message: "its too late bro" })
                    } else {
                        await emailToken.findOneAndDelete({ token: tokenId })

                        res.status(201).json({ message: "verified successfully" })
                    }

                })
            }

        })


    } else {
        res.status(400).json({ message: "bad boy" })

    }
}

const resetPassword = (req, res) => {
    //logic to write here
}
module.exports = {
    getUser,
    signUp,
    updateUser,
    loginUser,
    confirmEmail
}