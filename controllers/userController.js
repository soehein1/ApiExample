const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const senEmail = require('../emails/emailConfirmation')
const emailToken = require('../models/emailTokenModel')
require('dotenv').config()


async function hashPassword(password) {
    const salt = await bcrypt.genSalt(11);
    const hash = await bcrypt.hash(password, salt)
    return hash;
}

const getUser = async (req, res) => {
    var user = {}
    jwt.verify(req.token, process.env.TOKEN_KEY, (err, authData) => {
        if (err) {
            res.status(403).json({ message: "forbidden" })
        }
        else {
            user = authData
        }

    })
    user = await User.findOne({ email: user.email })
    if (user) {
        res.json(user)
    }
}
const signUp = async (req, res) => {

    // extract user information from request's body//
    const { full_name, email, password, phone, role,address } = req.body

    const hashedPassword = await hashPassword(password)
    const user = new User({
        full_name,
        role,
        phone,
        email,
        password: hashedPassword,
        address
    });
    const isUserExists = await User.findOne({ email: user.email })
    if (isUserExists) {
        res.json({ message: 'User Already Exists' })
    } else {
        const data = await user.save()
        const token = new emailToken({
            user: data._id,
            token: await bcrypt.genSalt(8)
        })
        const savedToken = await token.save()
        if (savedToken.token) {
            console.log(savedToken.token)
        }
        const url = req.hostname+"/api/user/confirmemail?token="+savedToken.token
        await senEmail({ "email": 'sohilerashid4@gmail.com', "name": "Sohile Yor Dad" }, { "email": data.email, "name": data.name },url)
        res.json(data)

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
                    sub: user._id, email: user.email, status: user.status

                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "3h",
                }
            );
            res.status(201).json({ token })
        } else {
            res.status(400).json({ message: "enter correct email and password" })
        }
    } catch (err) {
        console.log(err)

    }
}

const confirmEmail = async (req, res) => {
    //console.log(req.hostname + "        " + req.url)
    //console.log(req.query.token)
    const tokenId = req.query.token
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

const resetPassword=(req,res)=>{
    //logic to write here
}
module.exports = {
    getUser,
    signUp,
    updateUser,
    loginUser,
    confirmEmail
}