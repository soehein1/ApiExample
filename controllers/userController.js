const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const isPasswordValid = require('../validators/passwordValidator')

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(11);
    const hash = await bcrypt.hash(password, salt)
    return hash;
}

const getUser = (req, res) => {
    console.log('single user information');
    res.send('This is Single USER')
}
const postUser = async (req, res) => {

    // extract user information from request's body//

    const { fullName, email, paswd1, paswd2 } = req.body

    //test if any required field is missing//

    if (!fullName || !email || !paswd1 || !paswd2) {
        res.json({ message: 'information missing' })
    } else if (paswd1 != paswd2) {
        res.json({ message: 'passwords did not match' })
    } else if (!isPasswordValid(paswd1)) {
        res.json({ message: 'password invalid' })
    } else {

        const hashedPassword = await hashPassword(paswd1)
        const user = new User({
            fullName,
            email,
            paswd: hashedPassword
        });
        const isUserExists = await User.findOne({ email: user.email })
        if (isUserExists) {
            res.json({ message: 'User Already Exists' })
        } else {
            const data = await user.save()
            res.json(data)

        }

    }

}
const updateUser = (req, res) => {
    res.send('user updated')
}
module.exports = {
    getUser,
    postUser,
    updateUser
}