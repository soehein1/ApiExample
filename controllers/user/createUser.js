const res = require('express/lib/response')
const { User, Address } = require('../../models/user/userModel')
const hashPassword = require('./hashPassword')
require('dotenv').config()


const createUser = (req,res) => {
    const { full_name, phone, role, email, password } = req.body
    const { state, town, home_number, village_or_ward } = req.body

    if (!(full_name && email && role && password && state && town && village_or_ward)) {
        return null
    }
    const address = new Address({ state, town, home_number, village_or_ward })
    if (role === 'shopkeeper' || role === 'customer') {
        const user = new User({
            full_name,
            role,
            profile_picture: "",
            phone,
            email,
            password: hashPassword(password),
            address
        })
        return user
    }
    return {};

}
const userExists = async (email) => {
    const user = await User.findOne({ email: email })
    if (user) {
        return true
    } else {
        return false
    }
}
module.exports = { createUser, userExists }