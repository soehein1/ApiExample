const { User } = require("../models/user/userModel")
const ResetPasswordToken = require('../models/user/resetPasswordTokenModel')
const Image = require('../models/media/imageModel')
const bcrypt = require("bcrypt")
const { createUser, userExists } = require('./user/createUser')
const { createToken, isTokenExists } = require('../controllers/user/createToken')
const jwt = require('jsonwebtoken')

const sendEmail = require('../foreignAPIs/emailConfirmation')
const emailToken = require('../models/user/emailTokenModel')
const fs = require('fs')
const path = require("path")
const { generateAccessToken } = require("./user/auth")
const generatePwdToken = require('../controllers/user/pwdChangeToken')
const hashPassword = require("./user/hashPassword")
const createShop = require('../controllers/shop/createShop')
require('dotenv').config()

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email })
        if (user) {
            return res.status(200).json({ user: { name: user.full_name, email: user.email, role: user.role, phone: user.phone, profile_picture: user.profile_picture } })
        }
        return res.status(400).json({ user: {}, message: "forbidden" })

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ message: "something went wrong" })
    }
}
const signUp = async (req, res) => {
    try {
        const newUser = createUser(req)
        if (!newUser) {
            return res.status(400).json({ message: "user information incomplete" })
        }
        if (await userExists(newUser.email)) {
            return res.status(409).json({ message: 'Already Exists' })
        }
        if (newUser.role === 'shopkeeper') {
            const shop = await createShop(newUser)
            await shop.save()           ////////////////////////////////////////....................vvvvvvvvvvvvvvvvv
        }
        const data = await newUser.save()
        const token = createToken(data)
        const savedToken = await token.save()
        if (savedToken.token) {
            const url = "https://" + process.env.HOST_NAME + "/api/user/confirmemail?token=" + encodeURIComponent(savedToken.token)
            await sendEmail({ "email": 'sohilerashid4@gmail.com', "name": "Sohile Yor Dad" }, { "email": data.email, "name": data.name }, url)
            return res.status(201).json({ "user": { name: data.full_name, email: data.email, phone: data.phone, address: data.address, role: data.role } })
        }

        return res.status(400).json({ message: "something went wrong" })


    } catch (error) {

        console.log(error.message)
        return res.status(400).json({ message: "something went wrong" })
    }
}




const updateUser = (req, res) => {

    console.log(req.path)
    res.send('user updated')
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "all inputs are required" });
        }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateAccessToken(user)
            return res.status(200).json({
                token,
                user: {
                    name: user.full_name,
                    profile_picture: user.profile_picture,
                    email: user.email,
                    address: user.address,
                    phone: user.phone,
                    role: user.role
                }
            })
        } else {
            return res.status(400).json({ message: "incorrect email and password" })
        }
    } catch (err) {
        console.log("route: Log in route", err.message)
        return res.status(404).json({ message: "log in failed. try again later." })

    }
}

const confirmEmail = async (req, res) => {
    try {
        const tokenId = decodeURIComponent(req.query.token)
        if (!tokenId) {

            return res.status(400).json({ message: "bad boy" })

        }
        emailToken.findOne({ token: tokenId }, (err, token) => {
            if (err || !token) {
                return res.status(404).json({ message: "No such thing exists :-)" })
            }
            User.findOneAndUpdate({ _id: token.user, status: "pending" }, { status: "verified" }, async (error, user) => {
                if (error || !user) {
                    return res.status(400).json({ message: "its too late bro" })
                } else {
                    await emailToken.findOneAndDelete({ token: tokenId })

                    return res.status(200).json({ message: "verified successfully" })
                }

            })


        })
    } catch (error) {

    }

}







const forgotPassword = async (req, res) => {
    try {
        //logic to write here
        const { email } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ message: "something went wrong" })
        }
        const resetToken = new ResetPasswordToken({ user: user.email, token: generatePwdToken(5) })
        await resetToken.save()
        await sendEmail({ "email": process.env.SERVER_EMAIL, "name": "Jwellery Store" }, { "email": user.email }, "This is your code and it is valid for 2 hours.. " + resetToken.token)
        return res.status(201).json({ message: "check your email within five minutes" })
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ message: "wrong here" })
    }
}


const resetPassword = async (req, res) => {

    try {
        const token = req.query.token
        const { password, confirmPassword } = req.body
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "incorrect passwords" })
        }
        const savedToken = await ResetPasswordToken.findOne({ token: token })

        if (!savedToken) {
            return res.status(400).json({ message: "error timeout...." })
        }
        const user = await User.findOneAndUpdate({ email: savedToken.user }, { password: hashPassword(password) })
        await sendEmail({ "email": process.env.SERVER_EMAIL, "name": "Jwellery Store" }, { "email": user.email }, "Password Successfully Updated......")

        return res.status(201).json({ message: "password successfully changed" })


    } catch (error) {
        console.log(error.message)
        res.status(400).json({ messge: "something went wrong" })
    }


}


module.exports = {
    getUser,
    signUp,
    updateUser,
    loginUser,
    confirmEmail,
    forgotPassword,
    resetPassword
}
